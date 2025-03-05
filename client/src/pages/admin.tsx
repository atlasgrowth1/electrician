import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  console.log("Admin page rendering"); // Debug log

  const { data: businesses, isLoading, error } = useQuery<Business[]>({
    queryKey: ["/api/businesses"],
    retry: 1,
    refetchOnWindowFocus: false
  });

  console.log("Admin page load status:", {
    isLoading,
    error: error?.message,
    businessCount: businesses?.length
  });

  // Add mutation for updating business status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ site, newStatus }: { site: string, newStatus: "sent" | "viewed" }) => {
      await apiRequest("PATCH", `/api/business/${site}/status`, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/businesses"] });
      toast({
        title: "Success",
        description: "Business status updated successfully"
      });
    },
    onError: (error) => {
      console.error("Status update error:", error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return <div className="min-h-screen p-8">Loading businesses...</div>;
  }

  if (error) {
    return <div className="min-h-screen p-8 text-red-500">Error: {error.message}</div>;
  }

  if (!businesses || businesses.length === 0) {
    return <div className="min-h-screen p-8">No businesses found</div>;
  }

  const filteredBusinesses = businesses.filter(business => {
    const matchesState = stateFilter === "all" || business.state.toLowerCase() === stateFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || business.status === statusFilter;
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.site.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Business Pipeline Management</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="w-48">
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

          <div className="w-48">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Search by name or site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
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
              {filteredBusinesses.map((business) => (
                <TableRow key={business.site}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>{business.site}</TableCell>
                  <TableCell className="capitalize">{business.state}</TableCell>
                  <TableCell>
                    <Badge variant={
                      business.status === "viewed" ? "secondary" :
                      business.status === "sent" ? "outline" :
                      "default"
                    }>
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {business.status === "created" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatusMutation.mutate({
                          site: business.site,
                          newStatus: "sent"
                        })}
                        disabled={updateStatusMutation.isPending}
                      >
                        Mark as Sent
                      </Button>
                    )}
                    <a
                      href={`/${business.site}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-sm text-primary hover:underline"
                    >
                      View Site
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}