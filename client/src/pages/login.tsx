import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Business, loginSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Login() {
  const { site } = useParams();
  const { toast } = useToast();

  console.log("Login page - site parameter:", site);

  const { data: business, isLoading, error } = useQuery<Business>({
    queryKey: [`/api/business/${site}`],
    enabled: !!site,
    retry: 1
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      site: site || ""
    }
  });

  async function onSubmit(data: any) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      toast({
        title: "Success",
        description: "Logged in successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
  }

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
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8">Service Provider Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer business={business} />
    </div>
  );
}