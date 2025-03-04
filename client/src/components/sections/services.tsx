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
    <section id="services" className="bg-gray-50 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive electrical services for residential and commercial properties.
            Our licensed electricians are ready to help with any electrical needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <service.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
