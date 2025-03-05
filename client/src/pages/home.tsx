import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Business } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Reviews from "@/components/sections/reviews";
import Contact from "@/components/sections/contact";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { site } = useParams();
  console.log("Current site parameter:", site); // Debug log

  const { data: business, isLoading, error } = useQuery<Business>({
    queryKey: [`/api/business/${site}`],
    enabled: !!site,
    retry: 1
  });

  console.log("API response:", { business, isLoading, error }); // Debug log

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
      <main>
        <Hero business={business} />
        <Services />
        <Reviews business={business} />
        <Contact business={business} />
      </main>
      <Footer business={business} />
    </div>
  );
}