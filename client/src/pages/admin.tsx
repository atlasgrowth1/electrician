import { useEffect, useState } from "react";
import { type Business } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useBusinessStore } from "@/lib/businessStore";
import { Eye, Send, RefreshCw, Search, ExternalLink } from "lucide-react";

export default function Admin() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pipeline");
  const { toast } = useToast();
  
  // Get business data from our store
  const {
    businesses,
    isLoading,
    error,
    fetchBusinesses,
    updateBusinessStatus,
    getBusinessesByStage,
    getBusinessesCount
  } = useBusinessStore();
  
  // Load businesses when component mounts
  useEffect(() => {
    fetchBusinesses().catch(err => {
      console.error("Failed to fetch businesses:", err);
      toast({
        title: "Error",
        description: "Failed to load businesses. Please try again.",
        variant: "destructive"
      });
    });
  }, [fetchBusinesses, toast]);
  
  // Refresh data manually
  const handleRefresh = () => {
    fetchBusinesses()
      .then(() => {
        toast({
          title: "Success",
          description: "Business data refreshed successfully"
        });
      })
      .catch(err => {
        console.error("Failed to refresh businesses:", err);
        toast({
          title: "Error",
          description: "Failed to refresh data. Please try again.",
          variant: "destructive"
        });
      });
  };
  
  // Move business to a different pipeline stage
  const handleMoveToStage = async (business: Business, newStatus: "created" | "sent" | "viewed") => {
    try {
      await updateBusinessStatus(business.site, newStatus);
      toast({
        title: "Success",
        description: `${business.name} moved to ${newStatus} stage`
      });
    } catch (error) {
      console.error("Error moving business:", error);
      toast({
        title: "Error",
        description: "Failed to update business status",
        variant: "destructive"
      });
    }
  };
  
  // Filter businesses by search term and state
  const filterBusinesses = (businesses: Business[]) => {
    return businesses.filter(business => {
      const matchesState = stateFilter === "all" || business.state.toLowerCase() === stateFilter.toLowerCase();
      const matchesSearch = !searchTerm || 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.site.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesState && matchesSearch;
    });
  };
  
  // Get businesses for each pipeline stage, filtered by search/state
  const createdBusinesses = filterBusinesses(getBusinessesByStage("created"));
  const sentBusinesses = filterBusinesses(getBusinessesByStage("sent"));
  const viewedBusinesses = filterBusinesses(getBusinessesByStage("viewed"));
  
  // Total counts (unfiltered)
  const createdCount = getBusinessesCount("created");
  const sentCount = getBusinessesCount("sent");
  const viewedCount = getBusinessesCount("viewed");
  
  if (isLoading && businesses.length === 0) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent mb-4"></div>
          <p className="text-lg">Loading business data...</p>
        </div>
      </div>
    );
  }

  if (error && businesses.length === 0) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error loading businesses: {error}</div>
        <Button onClick={handleRefresh}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Business Pipeline</h1>
            <p className="text-gray-500">Manage and track your business leads through each stage</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            
            {businesses.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {businesses.length} Total Businesses
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-48">
            <Select
              value={stateFilter}
              onValueChange={setStateFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="alabama">Alabama</SelectItem>
                <SelectItem value="arkansas">Arkansas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or site..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Tabs defaultValue="pipeline" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pipeline" className="flex items-center gap-2">
              Pipeline View
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              Table View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Created Stage */}
              <PipelineStage 
                title="Website Created" 
                count={createdCount}
                filteredCount={createdBusinesses.length}
                businesses={createdBusinesses}
                onMoveToStage={(business) => handleMoveToStage(business, "sent")}
                moveButtonLabel="Mark as Sent"
                moveButtonIcon={<Send className="h-4 w-4 mr-2" />}
                color="blue"
              />
              
              {/* Sent Stage */}
              <PipelineStage 
                title="Website Sent" 
                count={sentCount}
                filteredCount={sentBusinesses.length}
                businesses={sentBusinesses}
                onMoveToStage={(business) => handleMoveToStage(business, "viewed")}
                moveButtonLabel="Mark as Viewed"
                moveButtonIcon={<Eye className="h-4 w-4 mr-2" />}
                color="orange"
              />
              
              {/* Viewed Stage */}
              <PipelineStage 
                title="Website Viewed" 
                count={viewedCount}
                filteredCount={viewedBusinesses.length}
                businesses={viewedBusinesses}
                moveButtonLabel="View Site"
                moveButtonType="view"
                color="green"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="table">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Site</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterBusinesses(businesses).map((business) => (
                      <TableRow key={business.site}>
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell>{business.site}</TableCell>
                        <TableCell className="capitalize">{business.state}</TableCell>
                        <TableCell>
                          <Badge variant={
                            business.status === "viewed" ? "success" :
                            business.status === "sent" ? "warning" :
                            "default"
                          }>
                            {business.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {business.status === "created" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMoveToStage(business, "sent")}
                                className="flex items-center gap-1"
                              >
                                <Send className="h-3 w-3" />
                                <span>Mark Sent</span>
                              </Button>
                            )}
                            {business.status === "sent" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMoveToStage(business, "viewed")}
                                className="flex items-center gap-1"
                              >
                                <Eye className="h-3 w-3" />
                                <span>Mark Viewed</span>
                              </Button>
                            )}
                            <a
                              href={`/${business.site}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Pipeline stage component
interface PipelineStageProps {
  title: string;
  count: number;
  filteredCount: number;
  businesses: Business[];
  onMoveToStage?: (business: Business) => void;
  moveButtonLabel: string;
  moveButtonIcon?: React.ReactNode;
  moveButtonType?: "action" | "view";
  color: "blue" | "green" | "orange";
}

function PipelineStage({
  title,
  count,
  filteredCount,
  businesses,
  onMoveToStage,
  moveButtonLabel,
  moveButtonIcon,
  moveButtonType = "action",
  color
}: PipelineStageProps) {
  const colorClasses = {
    blue: {
      header: "bg-blue-50 border-blue-200",
      title: "text-blue-800",
      badge: "bg-blue-100 text-blue-800",
    },
    green: {
      header: "bg-green-50 border-green-200",
      title: "text-green-800",
      badge: "bg-green-100 text-green-800",
    },
    orange: {
      header: "bg-orange-50 border-orange-200",
      title: "text-orange-800",
      badge: "bg-orange-100 text-orange-800",
    }
  };
  
  return (
    <Card className="shadow-md flex flex-col">
      <CardHeader className={`pb-3 ${colorClasses[color].header} border-b`}>
        <div className="flex justify-between items-center">
          <CardTitle className={`text-lg font-semibold ${colorClasses[color].title}`}>
            {title}
          </CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color].badge}`}>
            {filteredCount !== count ? `${filteredCount} / ${count}` : count}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-auto max-h-[600px]">
        {businesses.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No businesses in this stage
          </div>
        ) : (
          <div className="divide-y">
            {businesses.map((business) => (
              <div key={business.site} className="p-4 hover:bg-gray-50">
                <div className="mb-2 font-semibold">{business.name}</div>
                <div className="text-sm text-gray-500 mb-3">
                  {business.site} · {business.state}
                </div>
                <div className="flex gap-2">
                  {moveButtonType === "action" && onMoveToStage ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onMoveToStage(business)}
                      className="w-full flex items-center justify-center"
                    >
                      {moveButtonIcon}
                      {moveButtonLabel}
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full flex items-center justify-center"
                      asChild
                    >
                      <a 
                        href={`/${business.site}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {moveButtonLabel}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}