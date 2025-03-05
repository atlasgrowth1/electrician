import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Business, contactFormSchema, type ContactForm } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface ContactSectionProps {
  business: Business;
}

export default function Contact({ business }: ContactSectionProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  async function onSubmit(data: ContactForm) {
    setIsSubmitting(true);
    try {
      // In a real app, this would send to an API
      console.log("Form submitted:", data);
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible."
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      detail: business.phone,
      action: {
        label: "Call now",
        href: `tel:${business.phone}`
      }
    },
    {
      icon: Mail,
      title: "Email Us",
      detail: business.email,
      action: {
        label: "Send email",
        href: `mailto:${business.email}`
      }
    },
    {
      icon: MapPin,
      title: "Our Location",
      detail: `${business.address}, ${business.city}`,
      action: {
        label: "Get directions",
        href: `https://maps.google.com/?q=${business.address}, ${business.city}`
      }
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Mon-Fri: 8am-6pm | Weekend: On-call",
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 bg-blue-100 rounded-full">
            <span className="text-blue-800 text-sm font-medium">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question or need a quote? We're just a message away. Our team of experts is ready to assist you with all your electrical needs.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-600 mb-3">{item.detail}</p>
                    {item.action && (
                      <a 
                        href={item.action.href} 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                        target={item.action.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.action.label}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 bg-white rounded-xl shadow-xl p-8 border border-slate-100">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(123) 456-7890" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can we help?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your electrical problem or service needed..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}