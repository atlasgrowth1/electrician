import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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
import { Link } from "wouter";

export default function Admin() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Admin component rendered"); // Debug log

  const { data: businesses, isLoading, error } = useQuery<Business[]>({
    queryKey: ["/api/businesses"],
    retry: 1
  });

  useEffect(() => {
    console.log("Admin page - businesses data:", { businesses, isLoading, error }); // Debug log
  }, [businesses, isLoading, error]);

  if (isLoading) {
    return <div className="min-h-screen p-8">Loading businesses...</div>;
  }

  if (error) {
    console.error("Error loading businesses:", error);
    return <div className="min-h-screen p-8 text-red-500">Failed to load businesses: {error.message}</div>;
  }

  if (!businesses || businesses.length === 0) {
    return <div className="min-h-screen p-8">No businesses found</div>;
  }

  const filteredBusinesses = businesses.filter(business => {
    const matchesState = stateFilter === "all" || business.state === stateFilter;
    const matchesStatus = statusFilter === "all" || business.status === statusFilter;
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.site.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Business Sites Admin</h1>

        <div className="flex gap-4 mb-6">
          <div className="w-48">
            <Select
              value={stateFilter}
              onValueChange={(value) => setStateFilter(value)}
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
              onValueChange={(value) => setStatusFilter(value)}
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
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Pipeline Status</TableHead>
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
                    <Badge variant={business.status === "viewed" ? "secondary" : 
                                  business.status === "sent" ? "outline" : 
                                  "default"}>
                      {business.status || "created"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`/${business.site}`}
                      className="text-primary hover:underline"
                    >
                      View Site
                    </Link>
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