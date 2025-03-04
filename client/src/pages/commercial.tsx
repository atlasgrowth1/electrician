import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Business } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Commercial() {
  const { site } = useParams();
  console.log("Commercial page - site parameter:", site);

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
        <h1 className="text-4xl font-bold mb-8">Commercial Services</h1>
        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Commercial Electrical Solutions</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {business.name} provides comprehensive electrical services for businesses of all sizes. 
              Our experienced team understands the unique challenges of commercial electrical systems.
            </p>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li>Commercial Building Wiring</li>
              <li>Industrial Equipment Installation</li>
              <li>Energy Efficiency Upgrades</li>
              <li>Emergency Backup Systems</li>
              <li>Regular Maintenance & Inspections</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Experience & Expertise</h3>
                <p>With years of commercial electrical experience, we understand the complexities of business electrical systems.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-3">24/7 Emergency Service</h3>
                <p>We're available around the clock to handle any electrical emergencies that may affect your business operations.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Licensed & Insured</h3>
                <p>Our team is fully licensed and insured, providing you with peace of mind for all electrical work.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Competitive Pricing</h3>
                <p>We offer transparent, competitive pricing for all our commercial electrical services.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer business={business} />
    </div>
  );
}
