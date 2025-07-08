import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDeviceSchema, insertAlertSchema, insertReportSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard Analytics
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/analytics/usage/:timeRange?", async (req, res) => {
    try {
      const timeRange = req.params.timeRange || "30d";
      const usageData = await storage.getUsageAnalytics(timeRange);
      res.json(usageData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch usage analytics" });
    }
  });

  app.get("/api/analytics/devices/:timeRange?", async (req, res) => {
    try {
      const timeRange = req.params.timeRange || "30d";
      const deviceData = await storage.getDeviceAnalytics(timeRange);
      res.json(deviceData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device analytics" });
    }
  });

  app.get("/api/analytics/locations", async (req, res) => {
    try {
      const locationData = await storage.getLocationAnalytics();
      res.json(locationData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location analytics" });
    }
  });

  // Device Management
  app.get("/api/devices", async (req, res) => {
    try {
      const { status, location, usage, network } = req.query;
      const devices = await storage.getDevices({
        status: status as string,
        location: location as string,
        usage: usage as string,
        network: network as string,
      });
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch devices" });
    }
  });

  app.get("/api/devices/:id", async (req, res) => {
    try {
      const device = await storage.getDevice(parseInt(req.params.id));
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.json(device);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device" });
    }
  });

  app.post("/api/devices", async (req, res) => {
    try {
      const deviceData = insertDeviceSchema.parse(req.body);
      const device = await storage.createDevice(deviceData);
      res.status(201).json(device);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid device data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create device" });
    }
  });

  app.patch("/api/devices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deviceData = req.body;
      const device = await storage.updateDevice(id, deviceData);
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.json(device);
    } catch (error) {
      res.status(500).json({ message: "Failed to update device" });
    }
  });

  app.delete("/api/devices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDevice(id);
      if (!success) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete device" });
    }
  });

  app.get("/api/devices/:id/usage/:timeRange?", async (req, res) => {
    try {
      const deviceId = parseInt(req.params.id);
      const timeRange = req.params.timeRange || "30d";
      const usage = await storage.getDeviceUsage(deviceId, timeRange);
      res.json(usage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device usage" });
    }
  });

  app.get("/api/devices/:id/locations", async (req, res) => {
    try {
      const deviceId = parseInt(req.params.id);
      const locations = await storage.getDeviceLocations(deviceId);
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch device locations" });
    }
  });

  // Alert Management
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  app.patch("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alertData = req.body;
      const alert = await storage.updateAlert(id, alertData);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert" });
    }
  });

  app.delete("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAlert(id);
      if (!success) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete alert" });
    }
  });

  // Report Management
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const reportData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(reportData);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid report data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const report = await storage.getReport(id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  // User Management
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
