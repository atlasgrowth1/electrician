import type { Express } from "express";
import { createServer } from "http";
import fetch from "node-fetch";
import { businessSchema, loginSchema } from "@shared/schema";
import { storage } from "./storage";

const GITHUB_URL = "https://raw.githubusercontent.com/atlasgrowth1/data/refs/heads/main/electricians/alabama.json";

export async function registerRoutes(app: Express) {
  app.get("/api/business/:site", async (req, res) => {
    try {
      console.log(`Fetching business data for site: ${req.params.site}`);
      const response = await fetch(GITHUB_URL);

      if (!response.ok) {
        throw new Error(`GitHub API responded with status: ${response.status}`);
      }

      const businesses = await response.json() as Array<any>;
      const business = businesses.find((b) => b.site === req.params.site);

      if (!business) {
        console.log(`No business found for site: ${req.params.site}`);
        return res.status(404).json({ message: "Business not found" });
      }

      const validatedBusiness = businessSchema.parse(business);
      console.log(`Found business: ${validatedBusiness.name}`);
      res.json(validatedBusiness);
    } catch (error) {
      console.error("Error fetching business data:", error);
      res.status(500).json({ message: "Failed to fetch business data" });
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