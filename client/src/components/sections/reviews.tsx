import { useState } from "react";
import { type Business } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { StarIcon } from "lucide-react";

interface ReviewsProps {
  business: Business;
}

export default function Reviews({ business }: ReviewsProps) {
  // Mock reviews data - in a real app, this would come from an API
  const [reviews] = useState([
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      text: "Great service! They fixed my electrical issues quickly and professionally."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 5,
      text: "Very responsive and knowledgeable team. Would definitely recommend!"
    },
    {
      id: 3,
      name: "Michael Brown",
      rating: 4,
      text: "Professional service at a fair price. They explained everything clearly."
    },
    {
      id: 4,
      name: "Lisa Wilson",
      rating: 5,
      text: "Best electricians in the area! Fixed problems that other companies couldn't."
    }
  ]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Customer Reviews
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              See what our customers are saying about {business.name}
            </p>
          </div>
        </div>
        
        <div className="mx-auto mt-12 grid max-w-5xl">
          <Carousel className="w-full">
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                      <p className="font-medium">- {review.name}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
            <CarouselNext className="absolute right-0 translate-x-1/2" />
          </Carousel>
          
          <div className="mt-8 flex items-center justify-center">
            <a 
              href={business.reviews_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              View All {business.reviews} Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}