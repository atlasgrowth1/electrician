import type { Express } from "express";
import { createServer } from "http";
import fetch from "node-fetch";
import { businessSchema } from "@shared/schema";

const GITHUB_URL = "https://raw.githubusercontent.com/atlasgrowth1/data/refs/heads/main/electricians/alabama.json";

export async function registerRoutes(app: Express) {
  app.get("/api/business/:site", async (req, res) => {
    try {
      const response = await fetch(GITHUB_URL);
      const businesses = await response.json();
      
      const business = businesses.find((b: any) => b.site === req.params.site);
      
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }

      const validatedBusiness = businessSchema.parse(business);
      res.json(validatedBusiness);
    } catch (error) {
      console.error("Error fetching business data:", error);
      res.status(500).json({ message: "Failed to fetch business data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
