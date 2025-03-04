import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Business } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { site } = useParams();
  console.log("Dashboard page - site parameter:", site); // Debug log

  const { data: business, isLoading, error } = useQuery<Business>({
    queryKey: [`/api/business/${site}`],
    enabled: !!site,
    retry: 1
  });

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
        <h1 className="text-4xl font-bold mb-8">Provider Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Upcoming Appointments</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-muted-foreground">No appointments scheduled yet.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Recent Contacts</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-muted-foreground">No contacts available.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer business={business} />
    </div>
  );
}