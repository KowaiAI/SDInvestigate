import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  fullDescription: text("full_description"),
  url: text("url").notNull(),
  categoryId: integer("category_id").notNull(),
  pricing: text("pricing").notNull(), // 'free', 'freemium', 'premium'
  platform: text("platform").notNull(), // 'web', 'desktop', 'mobile', 'cli', 'api'
  rating: integer("rating").notNull().default(40), // 1-5 scale * 10 for decimals
  userCount: integer("user_count").notNull().default(0),
  features: text("features").array().notNull().default([]),
  useCases: jsonb("use_cases").$type<{title: string, description: string, color: string}[]>().notNull().default([]),
  tags: text("tags").array().notNull().default([]),
  isVerified: boolean("is_verified").notNull().default(true),
  lastUpdated: text("last_updated").notNull().default(""),
  isOfficial: boolean("is_official").notNull().default(false),
  hasApi: boolean("has_api").notNull().default(false),
  iconType: text("icon_type").notNull(), // 'fab', 'fas', 'far'
  iconName: text("icon_name").notNull(),
  iconColor: text("icon_color").notNull(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id").notNull(),
  userId: text("user_id").notNull(), // For now, using session-based IDs
});

export const userOnboarding = pgTable("user_onboarding", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  hasSeenWelcome: boolean("has_seen_welcome").notNull().default(false),
  hasSeenCategoryFilter: boolean("has_seen_category_filter").notNull().default(false),
  hasSeenSearch: boolean("has_seen_search").notNull().default(false),
  hasSeenToolCard: boolean("has_seen_tool_card").notNull().default(false),
  hasSeenExport: boolean("has_seen_export").notNull().default(false),
  hasSeenReport: boolean("has_seen_report").notNull().default(false),
  completedOnboarding: boolean("completed_onboarding").notNull().default(false),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertToolSchema = createInsertSchema(tools).omit({
  id: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
});

export const insertUserOnboardingSchema = createInsertSchema(userOnboarding).omit({
  id: true,
});

export type Category = typeof categories.$inferSelect;
export type Tool = typeof tools.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type UserOnboarding = typeof userOnboarding.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertTool = z.infer<typeof insertToolSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type InsertUserOnboarding = z.infer<typeof insertUserOnboardingSchema>;
