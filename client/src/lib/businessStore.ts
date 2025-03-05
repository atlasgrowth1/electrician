import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type Business } from '@shared/schema';
import { apiRequest } from './queryClient';

interface BusinessState {
  businesses: Business[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  
  // Actions
  fetchBusinesses: () => Promise<void>;
  updateBusinessStatus: (site: string, newStatus: "created" | "sent" | "viewed") => Promise<void>;
  moveBusinessToStage: (site: string, stage: "created" | "sent" | "viewed") => Promise<void>;
  getBusinessesByStage: (stage: "created" | "sent" | "viewed") => Business[];
  getBusinessesCount: (stage: "created" | "sent" | "viewed") => number;
  
  // Track view event without refreshing all data
  trackBusinessView: (site: string) => Promise<void>;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      businesses: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      
      fetchBusinesses: async () => {
        // Immediately use cached data if available
        const { lastFetched, businesses } = get();
        const now = Date.now();
        let shouldRefresh = true;
        
        // Only fetch fresh data if:
        // 1. We haven't fetched before, or
        // 2. Last fetch was more than a day ago, or
        // 3. We don't have any data
        if (lastFetched && now - lastFetched < 24 * 60 * 60 * 1000 && businesses.length > 0) {
          shouldRefresh = false;
        }
        
        // Always mark as loading initially if we don't have data
        if (businesses.length === 0) {
          set({ isLoading: true });
        }
        
        if (shouldRefresh) {
          try {
            const response = await apiRequest('GET', '/api/businesses');
            const data = await response.json();
            
            set({ 
              businesses: data,
              isLoading: false,
              lastFetched: now,
              error: null
            });
          } catch (error) {
            console.error('Error fetching businesses:', error);
            // Only set error if we don't have existing data
            if (businesses.length === 0) {
              set({ 
                error: error instanceof Error ? error.message : 'Failed to fetch businesses',
                isLoading: false
              });
            }
          }
        } else {
          // Just clear loading state if we're using cached data
          set({ isLoading: false });
        }
      },
      
      updateBusinessStatus: async (site, newStatus) => {
        // Update state optimistically first
        set(state => ({
          businesses: state.businesses.map(business => 
            business.site === site 
              ? { ...business, status: newStatus }
              : business
          )
        }));
        
        try {
          // Then send to server
          await apiRequest('PATCH', `/api/business/${site}/status`, { status: newStatus });
          return Promise.resolve();
        } catch (error) {
          console.error('Error updating business status:', error);
          
          // Revert the optimistic update on failure
          set(state => ({
            businesses: state.businesses.map(business => {
              if (business.site === site) {
                // Find the original business to get its previous status
                const originalBusiness = get().businesses.find(b => b.site === site);
                return { ...business, status: originalBusiness?.status || "created" };
              }
              return business;
            })
          }));
          
          return Promise.reject(error);
        }
      },
      
      moveBusinessToStage: async (site, stage) => {
        return get().updateBusinessStatus(site, stage);
      },
      
      getBusinessesByStage: (stage) => {
        return get().businesses.filter(business => business.status === stage);
      },
      
      getBusinessesCount: (stage) => {
        return get().businesses.filter(business => business.status === stage).length;
      },
      
      trackBusinessView: async (site) => {
        const business = get().businesses.find(b => b.site === site);
        
        // Only update if not already viewed
        if (business && business.status !== "viewed") {
          // Update locally first (optimistic update)
          set(state => ({
            businesses: state.businesses.map(b => 
              b.site === site ? { ...b, status: "viewed" as const } : b
            )
          }));
          
          try {
            // The endpoint should be lightweight and just track the view
            await apiRequest('POST', `/api/business/${site}/view-event`);
            return Promise.resolve();
          } catch (error) {
            console.error('Error tracking business view:', error);
            // No need to revert the optimistic update in this case
            // as we want to show it as viewed even if server fails
            return Promise.reject(error);
          }
        }
        return Promise.resolve();
      }
    }),
    {
      name: 'electrician-business-pipeline',
      storage: createJSONStorage(() => localStorage),
      // Only persist necessary data to reduce storage size
      partialize: (state) => ({ 
        businesses: state.businesses,
        lastFetched: state.lastFetched
      }),
    }
  )
);