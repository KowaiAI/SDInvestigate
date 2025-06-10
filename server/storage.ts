import { categories, tools, favorites, type Category, type Tool, type Favorite, type InsertCategory, type InsertTool, type InsertFavorite } from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Tools
  getTools(filters?: { categoryId?: number; search?: string; pricing?: string; hasApi?: boolean }): Promise<Tool[]>;
  getToolById(id: number): Promise<Tool | undefined>;
  getToolsByCategory(categoryId: number): Promise<Tool[]>;
  createTool(tool: InsertTool): Promise<Tool>;

  // Favorites
  getFavorites(userId: string): Promise<number[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(toolId: number, userId: string): Promise<void>;
  isFavorite(toolId: number, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private tools: Map<number, Tool>;
  private favorites: Map<string, Set<number>>;
  private currentCategoryId: number;
  private currentToolId: number;
  private currentFavoriteId: number;

  constructor() {
    this.categories = new Map();
    this.tools = new Map();
    this.favorites = new Map();
    this.currentCategoryId = 1;
    this.currentToolId = 1;
    this.currentFavoriteId = 1;
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize categories
    const defaultCategories: InsertCategory[] = [
      {
        name: "Social Media Intelligence",
        slug: "social-media",
        description: "Tools for investigating social media platforms, profiles, and content",
        icon: "fas fa-users",
        color: "blue"
      },
      {
        name: "Network Analysis",
        slug: "network",
        description: "Tools for network reconnaissance and infrastructure analysis",
        icon: "fas fa-network-wired",
        color: "green"
      },
      {
        name: "Geospatial Intelligence",
        slug: "geospatial",
        description: "Tools for location intelligence and geographic analysis",
        icon: "fas fa-globe",
        color: "red"
      },
      {
        name: "Search Engines",
        slug: "search",
        description: "Specialized search engines and discovery tools",
        icon: "fas fa-search",
        color: "purple"
      },
      {
        name: "Image Analysis",
        slug: "images",
        description: "Tools for reverse image search and visual analysis",
        icon: "fas fa-images",
        color: "pink"
      },
      {
        name: "Email Investigation",
        slug: "email",
        description: "Tools for email verification and investigation",
        icon: "fas fa-envelope",
        color: "orange"
      },
      {
        name: "Phone Numbers",
        slug: "phone",
        description: "Tools for phone number investigation and verification",
        icon: "fas fa-phone",
        color: "indigo"
      },
      {
        name: "Document Analysis",
        slug: "documents",
        description: "Tools for document analysis and metadata extraction",
        icon: "fas fa-file-alt",
        color: "gray"
      },
      {
        name: "Financial Intelligence",
        slug: "financial",
        description: "Tools for financial investigation and analysis",
        icon: "fas fa-dollar-sign",
        color: "yellow"
      },
      {
        name: "Threat Intelligence",
        slug: "threat",
        description: "Tools for threat detection and security analysis",
        icon: "fas fa-shield-alt",
        color: "red"
      },
      {
        name: "Dark Web",
        slug: "dark-web",
        description: "Tools for dark web monitoring and investigation",
        icon: "fas fa-user-secret",
        color: "black"
      }
    ];

    defaultCategories.forEach(category => {
      this.createCategory(category);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getTools(filters?: { categoryId?: number; search?: string; pricing?: string; hasApi?: boolean }): Promise<Tool[]> {
    let tools = Array.from(this.tools.values());

    if (filters) {
      if (filters.categoryId) {
        tools = tools.filter(tool => tool.categoryId === filters.categoryId);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        tools = tools.filter(tool => 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      if (filters.pricing) {
        tools = tools.filter(tool => tool.pricing === filters.pricing);
      }
      if (filters.hasApi !== undefined) {
        tools = tools.filter(tool => tool.hasApi === filters.hasApi);
      }
    }

    return tools;
  }

  async getToolById(id: number): Promise<Tool | undefined> {
    return this.tools.get(id);
  }

  async getToolsByCategory(categoryId: number): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => tool.categoryId === categoryId);
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = { ...insertTool, id };
    this.tools.set(id, tool);
    return tool;
  }

  async getFavorites(userId: string): Promise<number[]> {
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? Array.from(userFavorites) : [];
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const favorite: Favorite = { ...insertFavorite, id };
    
    if (!this.favorites.has(insertFavorite.userId)) {
      this.favorites.set(insertFavorite.userId, new Set());
    }
    this.favorites.get(insertFavorite.userId)!.add(insertFavorite.toolId);
    
    return favorite;
  }

  async removeFavorite(toolId: number, userId: string): Promise<void> {
    const userFavorites = this.favorites.get(userId);
    if (userFavorites) {
      userFavorites.delete(toolId);
    }
  }

  async isFavorite(toolId: number, userId: string): Promise<boolean> {
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? userFavorites.has(toolId) : false;
  }
}

export const storage = new MemStorage();
