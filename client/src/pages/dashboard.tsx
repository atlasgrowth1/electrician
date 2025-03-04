import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Business } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

export default function Dashboard() {
  const { site } = useParams();
  console.log("Dashboard page - site parameter:", site);

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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground">Today's Appointments</p>
                    <p className="text-3xl font-semibold">0</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Recent Contacts</p>
                    <p className="text-3xl font-semibold">0</p>
                  </div>
                </div>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Business Info</h2>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {business.name}</p>
                  <p><strong>Email:</strong> {business.email_1}</p>
                  <p><strong>Phone:</strong> {business.phone}</p>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <section className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">Appointments Calendar</h2>
              </div>
              <p className="text-muted-foreground">
                Calendar integration coming soon. You'll be able to manage your appointments and schedule here.
              </p>
            </section>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Contact Management</h2>
              <p className="text-muted-foreground">
                Contact management system coming soon. You'll be able to track and manage customer information here.
              </p>
            </section>
          </TabsContent>
        </Tabs>
      </main>
      <Footer business={business} />
    </div>
  );
}