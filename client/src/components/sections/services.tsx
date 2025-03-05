import { Link } from "wouter";
import { HomeIcon, Factory, Building2, Industrial, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Business } from "@shared/schema";

interface ServicesProps {
  business: Business;
}

export default function Services({ business }: ServicesProps) {
  const mainServices = [
    {
      icon: HomeIcon,
      title: "Residential",
      description: "Complete electrical solutions for homes, from new installations to repairs and upgrades.",
      features: [
        "Indoor & outdoor lighting installations",
        "Electrical panel upgrades",
        "Surge protection & safety installations",
        "Smart home wiring & automation"
      ],
      link: `/${business.site}`
    },
    {
      icon: Building2,
      title: "Commercial",
      description: "Professional electrical services for offices, retail spaces, and commercial buildings.",
      features: [
        "Commercial lighting solutions",
        "Data & communication wiring",
        "Energy efficiency upgrades",
        "Code compliance & safety inspections"
      ],
      link: `/${business.site}/commercial`
    },
    {
      icon: Industrial,
      title: "Industrial",
      description: "Specialized electrical expertise for factories, warehouses, and industrial facilities.",
      features: [
        "Industrial machinery wiring",
        "Control panel installation",
        "Power distribution systems",
        "Industrial lighting solutions"
      ],
      link: `/${business.site}/commercial`
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10"></div>
      
      <div className="container relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-blue-100 rounded-full">
            <span className="text-blue-800 text-sm font-medium">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Electrical Solutions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Professional electrical services tailored to your specific needs, whether it's residential, commercial, or industrial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainServices.map((service) => (
            <div 
              key={service.title} 
              className="group bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full"
            >
              <div className="p-8 flex-grow">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto p-6 pt-0">
                <Button 
                  asChild 
                  className="w-full bg-blue-600 hover:bg-blue-500 group-hover:shadow-lg transition-all"
                >
                  <Link href={service.link}>
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Location Map Section */}
        <div className="mt-24 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-blue-100 w-fit rounded-full">
                <span className="text-blue-800 text-sm font-medium">Our Location</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Serving {business.city} & Surrounding Areas</h3>
              <p className="text-slate-600 mb-8">
                Our team of electricians provides prompt service throughout {business.city} and neighboring communities.
                We're just a call away for all your electrical needs.
              </p>
              
              <div className="flex items-start gap-4 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Our Main Office</p>
                  <p className="text-slate-600">{business.address}, {business.city}</p>
                  <p className="text-slate-600">{business.state} {business.postal_code}</p>
                </div>
              </div>
              
              <Button 
                asChild 
                className="bg-blue-600 hover:bg-blue-500 w-full md:w-auto"
              >
                <a 
                  href={`https://maps.google.com/?q=${business.address}, ${business.city}, ${business.state}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="relative h-96 md:h-auto">
              <iframe 
                src={`https://maps.google.com/maps?q=${business.latitude || business.city},${business.longitude || business.state}&z=14&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}