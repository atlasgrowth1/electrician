import { type Business } from "@shared/schema";
import { Facebook, Mail, MapPin, Phone, Clock, Instagram, Twitter, Linkedin, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  business: Business;
}

export default function Footer({ business }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Facebook, url: business.facebook, label: "Facebook" },
    { icon: Instagram, url: business.instagram || "", label: "Instagram" },
    { icon: Twitter, url: business.twitter || "", label: "Twitter" },
    { icon: Linkedin, url: business.linkedin || "", label: "LinkedIn" }
  ].filter(link => link.url);

  const quickLinks = [
    { label: "Home", href: `/${business.site}` },
    { label: "Services", href: `/${business.site}#services` },
    { label: "Commercial", href: `/${business.site}/commercial` },
    { label: "Contact", href: `/${business.site}#contact` },
    { label: "Provider Login", href: `/${business.site}/login` },
  ];

  return (
    <footer>
      <div className="bg-gradient-to-b from-slate-900 to-blue-900 text-white py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 mb-10 border-b border-blue-800">
            <div className="md:max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-none">{business.name}</span>
                  <span className="text-xs text-blue-300">Licensed Electrical Contractor</span>
                </div>
              </div>
              
              <p className="text-blue-200 mb-8">
                Professional electrical services for residential and commercial properties. 
                Licensed, insured, and dedicated to quality workmanship and customer satisfaction.
              </p>
              
              <div className="bg-blue-800/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-blue-200">
                  {Object.entries(JSON.parse(business.working_hours)).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span className="text-white">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <h3 className="text-xl font-bold mb-5">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map(link => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-blue-200 hover:text-white transition-colors flex items-center"
                      >
                        <ArrowRight className="h-3.5 w-3.5 mr-2 text-blue-400" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-5">Contact Info</h3>
                <div className="space-y-4">
                  <a href={`tel:${business.phone}`} className="flex items-start gap-3 text-blue-200 hover:text-white group">
                    <Phone className="h-5 w-5 mt-0.5 text-blue-400 group-hover:text-white transition-colors" />
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <p>{business.phone}</p>
                    </div>
                  </a>
                  
                  <a href={`mailto:${business.email_1}`} className="flex items-start gap-3 text-blue-200 hover:text-white group">
                    <Mail className="h-5 w-5 mt-0.5 text-blue-400 group-hover:text-white transition-colors" />
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p>{business.email_1}</p>
                    </div>
                  </a>
                  
                  {business.street && (
                    <a href={business.location_link} target="_blank" rel="noopener noreferrer" 
                       className="flex items-start gap-3 text-blue-200 hover:text-white group">
                      <MapPin className="h-5 w-5 mt-0.5 text-blue-400 group-hover:text-white transition-colors" />
                      <div>
                        <p className="font-semibold text-white">Location</p>
                        <p>{`${business.street}, ${business.city}`}</p>
                        <p>{`${business.state} ${business.postal_code}`}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-5">Stay Connected</h3>
                <p className="text-blue-200 mb-5">
                  Follow us on social media for tips, updates, and special offers.
                </p>
                
                <div className="flex gap-3 mb-6">
                  {socialLinks.map(social => (
                    <a 
                      key={social.label}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-800/70 hover:bg-blue-700 p-2.5 rounded-full transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
                  <a href="#contact">Get a Free Quote</a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-blue-300 text-sm">
            <p>© {currentYear} {business.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Licensing</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}