import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Business } from "@shared/schema";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { site } = useParams();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: business, isLoading, error } = useQuery<Business>({
    queryKey: [`/api/business/${site}`],
    enabled: !!site,
    retry: 1
  });

  // Auto-login when page loads
  useEffect(() => {
    if (site) {
      handleLogin();
    }
  }, [site]);

  async function handleLogin() {
    try {
      // Mock login - no actual authentication
      console.log("Auto-login activated, redirecting to dashboard");

      toast({
        title: "Success",
        description: "Logged in automatically"
      });

      // Ensure we have a valid site before redirecting
      if (!site) {
        throw new Error('Missing site parameter');
      }

      // Redirect to dashboard after successful login
      setTimeout(() => {
        setLocation(`/${site}/dashboard`);
      }, 1500); // Short delay to show the toast
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  }

  if (isLoading) {
    return <div className="min-h-screen"><Skeleton className="w-full h-screen" /></div>;
  }

  if (error || !business) {
    return <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl text-red-500">Failed to load business data</h1>
    </div>;
  }

  return (
    <div className="min-h-screen">
      <Header business={business} />
      <main className="container py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Service Provider Portal</h1>
          <div className="bg-blue-50 rounded-xl p-8 shadow-lg border border-blue-100">
            <div className="animate-pulse mb-8">
              <div className="h-16 w-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg mt-4 text-slate-600">Logging you in automatically...</p>
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </main>
      <Footer business={business} />
    </div>
  );
}