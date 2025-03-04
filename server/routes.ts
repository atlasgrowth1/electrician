import type { Express } from "express";
import { createServer } from "http";
import fetch from "node-fetch";
import { businessSchema, loginSchema } from "@shared/schema";
import { storage } from "./storage";
import { ZodError } from "zod";

const GITHUB_BASE_URL = "https://raw.githubusercontent.com/atlasgrowth1/data/refs/heads/main/electricians";
const VALID_STATES = ["alabama", "arkansas"];

export async function registerRoutes(app: Express) {
  app.get("/api/business/:site", async (req, res) => {
    try {
      console.log(`Fetching business data for site: ${req.params.site}`);

      // Try each state file until we find the business
      let business = null;
      for (const state of VALID_STATES) {
        const response = await fetch(`${GITHUB_BASE_URL}/${state}.json`);

        if (!response.ok) {
          console.error(`Failed to fetch ${state} data: ${response.status}`);
          continue;
        }

        const businesses = await response.json() as Array<any>;
        business = businesses.find((b) => b.site === req.params.site);

        if (business) {
          console.log(`Found business in ${state}: ${business.name}`);
          break;
        }
      }

      if (!business) {
        console.log(`No business found for site: ${req.params.site}`);
        return res.status(404).json({ message: "Business not found" });
      }

      const validatedBusiness = businessSchema.parse(business);
      res.json(validatedBusiness);
    } catch (error) {
      console.error("Error fetching business data:", error);
      res.status(500).json({ message: "Failed to fetch business data" });
    }
  });

  app.get("/api/businesses", async (req, res) => {
    try {
      const allBusinesses = [];

      for (const state of VALID_STATES) {
        console.log(`Fetching businesses from ${state}`);
        const response = await fetch(`${GITHUB_BASE_URL}/${state}.json`);

        if (!response.ok) {
          console.error(`Failed to fetch ${state} data: ${response.status}`);
          continue;
        }

        const rawData = await response.text();
        console.log(`Raw response from ${state}:`, rawData.substring(0, 200) + '...');

        const businesses = JSON.parse(rawData) as Array<any>;
        console.log(`Found ${businesses.length} businesses in ${state}`);

        // Validate each business and add state info
        for (const business of businesses) {
          try {
            const validatedBusiness = businessSchema.parse({
              ...business,
              state,
              status: business.status || "created" // Ensure status has a default value
            });
            allBusinesses.push(validatedBusiness);
          } catch (error) {
            if (error instanceof ZodError) {
              console.error(`Validation failed for business ${business.name || 'unknown'} in ${state}:`, {
                errors: error.errors,
                data: business
              });
            } else {
              console.error(`Unknown error processing business in ${state}:`, error);
            }
            continue;
          }
        }
      }

      console.log(`Successfully validated and returning ${allBusinesses.length} businesses`);
      res.json(allBusinesses);
    } catch (error) {
      console.error("Error fetching all businesses:", error);
      res.status(500).json({ message: "Failed to fetch businesses data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const user = await storage.authenticateUser(credentials);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In a real app, we would set up a proper session here
      res.json({ user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Invalid request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}