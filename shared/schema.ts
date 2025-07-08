import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // admin, user
  status: text("status").notNull().default("active"), // active, inactive
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  imei: text("imei").notNull().unique(),
  status: text("status").notNull().default("offline"), // online, offline, error
  networkProvider: text("network_provider").notNull(),
  location: text("location"),
  country: text("country"),
  signalStrength: integer("signal_strength").default(0),
  batteryLevel: integer("battery_level"),
  ipAddress: text("ip_address"),
  lastSeen: timestamp("last_seen"),
  assignedUserId: integer("assigned_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deviceUsage = pgTable("device_usage", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id).notNull(),
  date: timestamp("date").notNull(),
  dataUsage: decimal("data_usage", { precision: 10, scale: 2 }).notNull(), // in GB
  cost: decimal("cost", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deviceLocations = pgTable("device_locations", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  accuracy: integer("accuracy"), // in meters
  timestamp: timestamp("timestamp").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // usage, connectivity, location, system
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull(), // low, medium, high, critical
  status: text("status").notNull().default("active"), // active, resolved, dismissed
  deviceId: integer("device_id").references(() => devices.id),
  triggerConditions: jsonb("trigger_conditions"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // usage, performance, location, custom
  format: text("format").notNull(), // pdf, excel, csv
  parameters: jsonb("parameters"),
  generatedBy: integer("generated_by").references(() => users.id).notNull(),
  filePath: text("file_path"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
});

export const insertDeviceSchema = createInsertSchema(devices).omit({
  id: true,
  createdAt: true,
  lastSeen: true,
});

export const insertDeviceUsageSchema = createInsertSchema(deviceUsage).omit({
  id: true,
  createdAt: true,
});

export const insertDeviceLocationSchema = createInsertSchema(deviceLocations).omit({
  id: true,
  createdAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Device = typeof devices.$inferSelect;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;

export type DeviceUsage = typeof deviceUsage.$inferSelect;
export type InsertDeviceUsage = z.infer<typeof insertDeviceUsageSchema>;

export type DeviceLocation = typeof deviceLocations.$inferSelect;
export type InsertDeviceLocation = z.infer<typeof insertDeviceLocationSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;

export type UserSession = typeof userSessions.$inferSelect;
