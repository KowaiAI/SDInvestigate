import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertToolSchema } from "@shared/schema";
import { z } from "zod";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by slug
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Get tools with optional filters
  app.get("/api/tools", async (req, res) => {
    try {
      const filters: any = {};
      
      if (req.query.categoryId) {
        filters.categoryId = parseInt(req.query.categoryId as string);
      }
      if (req.query.search) {
        filters.search = req.query.search as string;
      }
      if (req.query.pricing) {
        filters.pricing = req.query.pricing as string;
      }
      if (req.query.hasApi !== undefined) {
        filters.hasApi = req.query.hasApi === 'true';
      }

      const tools = await storage.getTools(filters);
      res.json(tools);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tools" });
    }
  });

  // Get tool by ID
  app.get("/api/tools/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tool = await storage.getToolById(id);
      if (!tool) {
        return res.status(404).json({ message: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tool" });
    }
  });

  // Create new tool
  app.post("/api/tools", async (req, res) => {
    try {
      const validatedData = insertToolSchema.parse(req.body);
      const tool = await storage.createTool(validatedData);
      res.status(201).json(tool);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid tool data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create tool" });
    }
  });

  // Get user favorites
  app.get("/api/favorites", async (req, res) => {
    try {
      const userId = req.session?.id || 'anonymous';
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  // Add favorite
  app.post("/api/favorites", async (req, res) => {
    try {
      const { toolId } = req.body;
      const userId = req.session?.id || 'anonymous';
      
      if (!toolId) {
        return res.status(400).json({ message: "Tool ID is required" });
      }

      const favorite = await storage.addFavorite({ toolId: parseInt(toolId), userId });
      res.status(201).json(favorite);
    } catch (error) {
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  // Remove favorite
  app.delete("/api/favorites/:toolId", async (req, res) => {
    try {
      const toolId = parseInt(req.params.toolId);
      const userId = req.session?.id || 'anonymous';
      
      await storage.removeFavorite(toolId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  // Export tools
  app.post("/api/export", async (req, res) => {
    try {
      const { format, filters, options } = req.body;
      
      // Get tools based on filters
      const tools = await storage.getTools(filters);
      const categories = await storage.getCategories();
      
      // Create export data
      const exportData = {
        exportDate: new Date().toISOString(),
        toolCount: tools.length,
        tools: tools.map(tool => {
          const category = categories.find(c => c.id === tool.categoryId);
          return {
            ...tool,
            categoryName: category?.name || 'Unknown',
            ratingDisplay: (tool.rating / 10).toFixed(1),
            userCountDisplay: tool.userCount >= 1000 ? `${(tool.userCount / 1000).toFixed(1)}k` : tool.userCount.toString()
          };
        }),
        categories
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="osint-tools-export-${Date.now()}.json"`);
      res.json(exportData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export tools" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
