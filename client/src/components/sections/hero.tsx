import { type Business } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HeroProps {
  business: Business;
}

export default function Hero({ business }: HeroProps) {
  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="absolute inset-0 bg-[url('/electric-pattern.svg')] opacity-10"></div>
      <div className="container py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-600/30 rounded-full text-blue-100 font-medium mb-6 backdrop-blur-sm">
              Trusted by {business.reviews}+ satisfied customers
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Power Your World</span> in {business.city || "Your Area"}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Licensed and insured electrical contractors available 24/7.
              Expert solutions, guaranteed satisfaction.
            </p>
            
            <div className="flex items-center gap-4 mb-8 bg-white/10 p-3 rounded-lg backdrop-blur-sm max-w-fit">
              <div className="flex items-center">
                {Array.from({ length: Math.floor(business.rating) }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-medium">{business.rating}/5</span>
              <a href={business.reviews_link} target="_blank" rel="noopener noreferrer"
                 className="text-lg text-blue-100 hover:text-white transition-colors">
                See Reviews →
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all" asChild>
                <a href={`tel:${business.phone}`}>Call Now</a>
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800/50 hover:text-white transition-all backdrop-blur-sm" asChild>
                <a href="#contact">Get a Free Quote</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 to-transparent z-10"></div>
              <img 
                src="/electrician-hero.jpg" 
                alt="Professional electrician" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}