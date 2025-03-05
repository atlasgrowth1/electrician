import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, HomeIcon, Factory, Shield, Zap, Wrench } from "lucide-react";

const services = [
  {
    icon: HomeIcon,
    title: "Residential Services",
    description: "Complete home electrical installations, repairs, and upgrades for your peace of mind."
  },
  {
    icon: Factory,
    title: "Commercial Services",
    description: "Professional electrical solutions for businesses, offices, and commercial properties."
  },
  {
    icon: Shield,
    title: "Safety Inspections",
    description: "Thorough electrical safety inspections and code compliance assessments."
  },
  {
    icon: Lightbulb,
    title: "Lighting Installation",
    description: "Modern lighting solutions including LED upgrades and smart lighting systems."
  },
  {
    icon: Zap,
    title: "Emergency Services",
    description: "24/7 emergency electrical services when you need them most."
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Regular maintenance and servicing to prevent electrical issues."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10"></div>
      
      <div className="container relative z-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-blue-100 rounded-full">
            <span className="text-blue-800 text-sm font-medium">Expert Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Services We Provide</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our team of licensed electricians delivers comprehensive electrical services for both residential and commercial properties, ensuring safety and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-bl-3xl transform rotate-12 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="p-8">
                <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
                
                <div className="mt-8 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}