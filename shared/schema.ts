import { z } from "zod";

export const businessSchema = z.object({
  name: z.string(),
  site: z.string(),
  phone: z.string(),
  street: z.string(),
  city: z.string(),
  postal_code: z.string(),
  state: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number(),
  reviews: z.number(),
  reviews_link: z.string(),
  photo_count: z.string(),
  working_hours: z.string(),
  logo: z.string(),
  verified: z.string(),
  location_link: z.string(),
  place_id: z.string(),
  email_1: z.string(),
  facebook: z.string()
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type Business = z.infer<typeof businessSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
