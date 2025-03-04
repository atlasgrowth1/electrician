import { type Business } from "@shared/schema";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  business: Business;
}

export default function Footer({ business }: FooterProps) {
  return (
    <footer className="bg-gray-100">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href={`tel:${business.phone}`} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" />
                {business.phone}
              </a>
              <a href={`mailto:${business.email_1}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" />
                {business.email_1}
              </a>
              {business.street && (
                <a href={business.location_link} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 hover:text-primary">
                  <MapPin className="h-4 w-4" />
                  {`${business.street}, ${business.city}, ${business.state} ${business.postal_code}`}
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2">
              {Object.entries(JSON.parse(business.working_hours)).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {business.facebook && (
                <a href={business.facebook} target="_blank" rel="noopener noreferrer"
                   className="hover:text-primary">
                  <Facebook className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
