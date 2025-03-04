import { z } from "zod";

export const businessSchema = z.object({
  name: z.string(),
  site: z.string(),
  phone: z.string(),
  street: z.string(),
  city: z.string(),
  postal_code: z.string(),
  state: z.string(),
  latitude: z.union([z.string(), z.number()]).transform(val => Number(val)),
  longitude: z.union([z.string(), z.number()]).transform(val => Number(val)),
  rating: z.union([z.string(), z.number()]).transform(val => Number(val)),
  reviews: z.union([z.string(), z.number()]).transform(val => Number(val)),
  reviews_link: z.string(),
  photo_count: z.string(),
  working_hours: z.string(),
  logo: z.string(),
  verified: z.string(),
  location_link: z.string(),
  place_id: z.string(),
  email_1: z.string(),
  facebook: z.string(),
  status: z.enum(["created", "sent", "viewed"]).default("created")
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  site: z.string()
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  site: z.string(),
  name: z.string(),
  role: z.enum(["provider"]),
  createdAt: z.string()
});

export type Business = z.infer<typeof businessSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;