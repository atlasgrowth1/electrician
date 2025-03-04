import { useQuery } from "@tanstack/react-query";
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
import { Link } from "wouter";

export default function Admin() {
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: businesses, isLoading } = useQuery<(Business & { state: string })[]>({
    queryKey: ["/api/businesses"],
    retry: 1
  });

  if (isLoading) {
    return <div className="min-h-screen p-8">Loading businesses...</div>;
  }

  if (!businesses) {
    return <div className="min-h-screen p-8">Failed to load businesses</div>;
  }

  const filteredBusinesses = businesses.filter(business => {
    const matchesState = stateFilter === "all" || business.state === stateFilter;
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.site.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
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
                    <Badge>Created</Badge>
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
