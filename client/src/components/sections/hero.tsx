import { type Business } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HeroProps {
  business: Business;
}

export default function Hero({ business }: HeroProps) {
  return (
    <section id="home" className="relative">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Electrical Services in {business.city || "Your Area"}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Licensed and insured electrical contractors providing reliable services 24/7.
            Your satisfaction is our priority.
          </p>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center">
              {Array.from({ length: Math.floor(business.rating) }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-medium">{business.rating}/5</span>
            <a href={business.reviews_link} target="_blank" rel="noopener noreferrer"
               className="text-lg text-muted-foreground">
              ({business.reviews} reviews)
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href={`tel:${business.phone}`}>Call Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get a Quote</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
