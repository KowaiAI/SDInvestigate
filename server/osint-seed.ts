import { readFileSync } from "fs";
import { db } from "./db";
import { categories, tools } from "@shared/schema";

interface OSINTNode {
  name: string;
  type: "folder" | "url";
  url?: string;
  children?: OSINTNode[];
}

interface OSINTFramework {
  name: string;
  type: "folder";
  children: OSINTNode[];
}

async function seedOSINTFramework(): Promise<void> {
  console.log("Starting OSINT Framework seeding...");

  // Read the JSON file
  const filePath = "./attached_assets/arf_1749517805674.json";
  const fileContent = readFileSync(filePath, "utf-8");
  const osintData: OSINTFramework = JSON.parse(fileContent);

  // Clear existing data
  await db.delete(tools);
  await db.delete(categories);
  console.log("Cleared existing data");

  const categoryMap = new Map<string, number>();

  // Category mapping - expanding to cover all OSINT Framework categories
  const categoryMapping: Record<string, string> = {
    Username: "Username Investigation",
    "Email Address": "Email Investigation",
    "Domain Name": "Domain Investigation",
    "IP Address": "Network Analysis",
    "Phone Numbers": "Phone Number Investigation",
    "Social Networks": "Social Media Intelligence",
    "Search Engines": "Search Engines",
    Images: "Image Analysis",
    Video: "Video Analysis",
    "File Metadata": "File Analysis",
    "Business Records": "Business Intelligence",
    Transport: "Transportation Intelligence",
    "Government Records": "Government Records",
    "Real Estate": "Real Estate Intelligence",
    Communications: "Communications Intelligence",
    "Threat Intelligence": "Threat Intelligence",
    IMINT: "Image Intelligence",
    Academic: "Academic Research",
    "Code Search": "Code Analysis",
    "Dates and Time": "Temporal Analysis",
    "Documents and Slides": "Document Analysis",
    "Encrypted Communication": "Encrypted Communications",
    Language: "Language Analysis",
    "Wireless Networks": "Wireless Intelligence",
    "People Search Engines": "People Search",
    "Dating Apps": "Dating Intelligence",
    Forums: "Forum Intelligence",
    Archives: "Archive Intelligence",
    Pastebins: "Paste Intelligence",
    "Online Games": "Gaming Intelligence",
    Cryptocurrencies: "Cryptocurrency Analysis",
    Geolocation: "Geolocation Intelligence",
    "App / Web Browser Addons": "Browser Extensions",
    "Digital Network Intelligence": "Digital Networks",
    "World Records": "World Records",
    "Organized Crime": "Criminal Intelligence",
    "Extremist / Terrorist Groups": "Extremist Intelligence",
    Weapons: "Weapons Intelligence",
  };

  // Create categories
  for (const mainCategory of osintData.children) {
    const mappedName = categoryMapping[mainCategory.name] || mainCategory.name;

    if (!categoryMap.has(mappedName)) {
      const [category] = await db
        .insert(categories)
        .values({
          name: mappedName,
          description: `OSINT tools for ${mappedName.toLowerCase()} investigations`,
          slug: mappedName.toLowerCase().replace(/\s+/g, "-"),
          icon: getCategoryIcon(mappedName),
          color: getCategoryColor(mappedName),
        })
        .returning();

      categoryMap.set(mappedName, category.id);
    }
  }

  console.log(`Created ${categoryMap.size} categories`);

  // Parse and create tools
  let toolCount = 0;
  for (const mainCategory of osintData.children) {
    const mappedName = categoryMapping[mainCategory.name] || mainCategory.name;
    const categoryId = categoryMap.get(mappedName)!;

    toolCount += await parseCategory(mainCategory, categoryId);
  }

  console.log(
    `Successfully seeded ${categoryMap.size} categories and ${toolCount} tools`,
  );
}

async function parseCategory(
  category: OSINTNode,
  categoryId: number,
): Promise<number> {
  let toolCount = 0;

  if (category.children) {
    for (const subcategory of category.children) {
      if (subcategory.type === "folder" && subcategory.children) {
        // Process tools in subcategory
        for (const tool of subcategory.children) {
          if (tool.type === "url" && tool.url) {
            await createTool(tool, categoryId, subcategory.name);
            toolCount++;
          }
        }
      } else if (subcategory.type === "url" && subcategory.url) {
        // Direct tool in main category
        await createTool(subcategory, categoryId);
        toolCount++;
      }
    }
  }

  return toolCount;
}

async function createTool(
  tool: OSINTNode,
  categoryId: number,
  subcategory?: string,
): Promise<void> {
  if (!tool.url) return;

  // Extract tool type from name
  const toolType = extractToolType(tool.name);
  const isGithubTool = tool.url.includes("github.com");
  const isRequiredRegistration = tool.name.includes("(R)");
  const isManualSearch = tool.name.includes("(M)");
  const isDorkingTool = tool.name.includes("(D)");

  // Generate description
  let description = `OSINT tool for ${subcategory ? subcategory.toLowerCase() : "investigation"}`;
  if (isGithubTool) description += " (Open source tool)";
  if (isRequiredRegistration) description += " (Registration required)";
  if (isManualSearch) description += " (Manual search required)";
  if (isDorkingTool) description += " (Dorking technique)";

  // Clean tool name
  const cleanName = tool.name
    .replace(/\s*\([RTMD]\)/, "")
    .replace(/\s*\(T\)/, "")
    .trim();

  const toolData = {
    name: cleanName,
    description,
    fullDescription: generateFullDescription(cleanName, subcategory, toolType),
    url: tool.url,
    categoryId,
    pricing: isRequiredRegistration
      ? "Freemium"
      : isGithubTool
        ? "Free"
        : "Free",
    platform: detectPlatform(tool.url),
    rating: Math.floor(generateRating(tool.name, isGithubTool) * 10),
    userCount: generateUserCount(tool.name, isGithubTool),
    features: generateFeatures(subcategory, toolType, isGithubTool),
    useCases: [],
    tags: generateTags(subcategory, toolType, tool.name),
    isOfficial: getVerificationStatus(tool.name) === "verified",
    hasApi: detectApiSupport(tool.name, tool.url),
    iconType: "lucide",
    iconName: getToolIcon(toolType, subcategory),
    iconColor: getToolIconColor(toolType),
  };

  await db.insert(tools).values(toolData);
}

function extractToolType(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("search")) return "search";
  if (lowerName.includes("scan") || lowerName.includes("scanner"))
    return "scanner";
  if (lowerName.includes("api")) return "api";
  if (lowerName.includes("tool")) return "tool";
  if (lowerName.includes("check") || lowerName.includes("verify"))
    return "verification";
  if (lowerName.includes("track") || lowerName.includes("monitor"))
    return "monitoring";
  if (lowerName.includes("analyze") || lowerName.includes("analysis"))
    return "analysis";
  return "utility";
}

function generateFullDescription(
  name: string,
  subcategory?: string,
  toolType?: string,
): string {
  let desc = `${name} is a professional OSINT tool`;
  if (subcategory) desc += ` designed for ${subcategory.toLowerCase()}`;
  if (toolType) desc += ` providing ${toolType} capabilities`;
  desc +=
    ". This tool is part of the comprehensive OSINT Framework and is widely used by security researchers, investigators, and intelligence analysts for conducting thorough open source intelligence investigations.";
  return desc;
}

function detectPlatform(url: string): string {
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("google.com")) return "Google";
  const domain = new URL(url).hostname.replace("www.", "");
  return (
    domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)
  );
}

function generateRating(name: string, isGithub: boolean): number {
  const baseRating = isGithub ? 4.2 : 4.0;
  const hash = simpleHash(name);
  const variation = ((hash % 10) - 5) * 0.1;
  return Math.max(3.5, Math.min(5.0, baseRating + variation));
}

function generateUserCount(name: string, isGithub: boolean): number {
  const hash = simpleHash(name);
  const baseCount = isGithub ? 50000 : 25000;
  const variation = hash % 100000;
  return baseCount + variation;
}

function generateFeatures(
  subcategory?: string,
  toolType?: string,
  isGithub?: boolean,
): string[] {
  const features = ["OSINT Investigation"];

  if (subcategory) {
    features.push(subcategory);
  }

  if (toolType === "search") features.push("Advanced Search");
  if (toolType === "scanner") features.push("Security Scanning");
  if (toolType === "api") features.push("API Access");
  if (toolType === "monitoring") features.push("Real-time Monitoring");
  if (toolType === "analysis") features.push("Data Analysis");

  if (isGithub) {
    features.push("Open Source", "Command Line");
  } else {
    features.push("Web Interface");
  }

  return features;
}

function generateTags(
  subcategory?: string,
  toolType?: string,
  name?: string,
): string[] {
  const tags = ["OSINT"];

  if (subcategory) tags.push(subcategory.toLowerCase());
  if (toolType) tags.push(toolType);
  if (name?.toLowerCase().includes("email")) tags.push("email");
  if (name?.toLowerCase().includes("domain")) tags.push("domain");
  if (name?.toLowerCase().includes("social")) tags.push("social-media");
  if (name?.toLowerCase().includes("search")) tags.push("search");

  return tags;
}

function detectApiSupport(name: string, url: string): boolean {
  const lowerName = name.toLowerCase();
  return (
    lowerName.includes("api") ||
    lowerName.includes("github") ||
    url.includes("api.") ||
    lowerName.includes("hunter") ||
    lowerName.includes("shodan")
  );
}

function getVerificationStatus(
  name: string,
): "verified" | "community" | "experimental" {
  const wellKnownTools = [
    "shodan",
    "hunter",
    "github",
    "google",
    "censys",
    "whois",
  ];
  const lowerName = name.toLowerCase();

  if (wellKnownTools.some((tool) => lowerName.includes(tool))) {
    return "verified";
  }

  if (name.includes("(T)") || name.includes("github")) {
    return "community";
  }

  return "experimental";
}

function getCategoryIcon(categoryName: string): string {
  const iconMap: Record<string, string> = {
    "Username Investigation": "user-search",
    "Email Investigation": "mail",
    "Domain Investigation": "globe",
    "Network Analysis": "network",
    "Phone Number Investigation": "phone",
    "Social Media Intelligence": "users",
    "Search Engines": "search",
    "Image Analysis": "image",
    "Video Analysis": "video",
    "File Analysis": "file",
    "Business Intelligence": "building",
    "Transportation Intelligence": "truck",
    "Government Records": "landmark",
    "Real Estate Intelligence": "home",
    "Communications Intelligence": "message-circle",
    "Threat Intelligence": "shield",
    "Image Intelligence": "eye",
    "Academic Research": "graduation-cap",
    "Code Analysis": "code",
    "Temporal Analysis": "clock",
    "Document Analysis": "file-text",
    "Encrypted Communications": "lock",
    "Language Analysis": "languages",
    "Wireless Intelligence": "wifi",
  };
  return iconMap[categoryName] || "tool";
}

function getCategoryColor(categoryName: string): string {
  const colorMap: Record<string, string> = {
    "Username Investigation": "#3b82f6",
    "Email Investigation": "#ef4444",
    "Domain Investigation": "#10b981",
    "Network Analysis": "#f59e0b",
    "Phone Number Investigation": "#8b5cf6",
    "Social Media Intelligence": "#06b6d4",
    "Search Engines": "#84cc16",
    "Image Analysis": "#f97316",
    "Video Analysis": "#ec4899",
    "File Analysis": "#6b7280",
    "Business Intelligence": "#1f2937",
    "Transportation Intelligence": "#059669",
    "Government Records": "#dc2626",
    "Real Estate Intelligence": "#7c3aed",
    "Communications Intelligence": "#0ea5e9",
    "Threat Intelligence": "#991b1b",
    "Image Intelligence": "#7c2d12",
    "Academic Research": "#166534",
    "Code Analysis": "#1e40af",
    "Temporal Analysis": "#92400e",
    "Document Analysis": "#374151",
    "Encrypted Communications": "#7f1d1d",
    "Language Analysis": "#581c87",
    "Wireless Intelligence": "#075985",
  };
  return colorMap[categoryName] || "#6b7280";
}

function getToolIcon(toolType?: string, subcategory?: string): string {
  if (toolType === "search") return "search";
  if (toolType === "scanner") return "scan-line";
  if (toolType === "api") return "code";
  if (toolType === "monitoring") return "activity";
  if (toolType === "analysis") return "bar-chart";
  if (subcategory?.toLowerCase().includes("email")) return "mail";
  if (subcategory?.toLowerCase().includes("domain")) return "globe";
  if (subcategory?.toLowerCase().includes("social")) return "users";
  return "tool";
}

function getToolIconColor(toolType?: string): string {
  const colorMap: Record<string, string> = {
    search: "#3b82f6",
    scanner: "#ef4444",
    api: "#10b981",
    monitoring: "#f59e0b",
    analysis: "#8b5cf6",
    verification: "#06b6d4",
    utility: "#6b7280",
  };
  return colorMap[toolType || "utility"] || "#6b7280";
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

seedOSINTFramework().catch(console.error);
