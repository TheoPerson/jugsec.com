import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

// ──────────────────────────────────────────────────────────
// USERS
// ──────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: varchar("display_name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  tier: varchar("tier", { length: 20 }).notNull().default("free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// SESSIONS
// ──────────────────────────────────────────────────────────

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// SYSTEM PROFILES — user's gaming PC hardware
// ──────────────────────────────────────────────────────────

export const systemProfiles = pgTable("system_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull().default("My Gaming PC"),
  cpu: varchar("cpu", { length: 200 }),
  gpu: varchar("gpu", { length: 200 }),
  ramGb: integer("ram_gb"),
  storageType: varchar("storage_type", { length: 50 }),
  monitorResolution: varchar("monitor_resolution", { length: 50 }),
  monitorRefreshRate: integer("monitor_refresh_rate"),
  osVersion: varchar("os_version", { length: 100 }),
  isPrimary: boolean("is_primary").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// OPTIMIZATION SCANS — AI-powered system analysis
// ──────────────────────────────────────────────────────────

export const optimizationScans = pgTable("optimization_scans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  systemProfileId: uuid("system_profile_id").references(
    () => systemProfiles.id,
    {
      onDelete: "set null",
    },
  ),
  overallScore: integer("overall_score"),
  cpuScore: integer("cpu_score"),
  gpuScore: integer("gpu_score"),
  ramScore: integer("ram_score"),
  storageScore: integer("storage_score"),
  networkScore: integer("network_score"),
  recommendations: jsonb("recommendations").$type<Recommendation[]>(),
  aiAnalysis: text("ai_analysis"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// GAME PROFILES — curated optimization presets per game
// ──────────────────────────────────────────────────────────

export const gameProfiles = pgTable("game_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  iconUrl: text("icon_url"),
  category: varchar("category", { length: 50 }),
  publisher: varchar("publisher", { length: 200 }),
  recommendedSpecs: jsonb("recommended_specs").$type<GameSpecs>(),
  optimizations: jsonb("optimizations").$type<GameOptimization[]>(),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// USER ↔ GAME PROFILE junction
// ──────────────────────────────────────────────────────────

export const userGameProfiles = pgTable("user_game_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  gameProfileId: uuid("game_profile_id")
    .notNull()
    .references(() => gameProfiles.id, { onDelete: "cascade" }),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  customTweaks: jsonb("custom_tweaks"),
});

// ──────────────────────────────────────────────────────────
// OPTIMIZATION HISTORY — audit trail
// ──────────────────────────────────────────────────────────

export const optimizationHistory = pgTable("optimization_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  scanId: uuid("scan_id").references(() => optimizationScans.id, {
    onDelete: "set null",
  }),
  action: varchar("action", { length: 200 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  beforeValue: text("before_value"),
  afterValue: text("after_value"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────
// SHARED TYPES
// ──────────────────────────────────────────────────────────

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  category: "cpu" | "gpu" | "ram" | "storage" | "network" | "os" | "game";
  impact: "low" | "medium" | "high" | "critical";
  difficulty: "easy" | "moderate" | "advanced";
  estimatedGain: string;
  steps: string[];
  applied: boolean;
};

export type GameSpecs = {
  minCpu: string;
  minGpu: string;
  minRamGb: number;
  recCpu: string;
  recGpu: string;
  recRamGb: number;
};

export type GameOptimization = {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: string[];
  impact: "low" | "medium" | "high";
};
