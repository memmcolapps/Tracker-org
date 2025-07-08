import { 
  users, 
  devices, 
  deviceUsage, 
  deviceLocations, 
  alerts, 
  reports,
  type User, 
  type InsertUser, 
  type Device, 
  type InsertDevice,
  type DeviceUsage,
  type DeviceLocation,
  type Alert,
  type InsertAlert,
  type Report,
  type InsertReport
} from "@shared/schema";
import { DashboardStats } from "@/types";

interface DeviceFilters {
  status?: string;
  location?: string;
  usage?: string;
  network?: string;
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;

  // Device methods
  getDevices(filters?: DeviceFilters): Promise<Device[]>;
  getDevice(id: number): Promise<Device | undefined>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, device: Partial<Device>): Promise<Device | undefined>;
  deleteDevice(id: number): Promise<boolean>;
  getDeviceUsage(deviceId: number, timeRange: string): Promise<DeviceUsage[]>;
  getDeviceLocations(deviceId: number): Promise<DeviceLocation[]>;

  // Analytics methods
  getDashboardStats(): Promise<DashboardStats>;
  getUsageAnalytics(timeRange: string): Promise<any[]>;
  getDeviceAnalytics(timeRange: string): Promise<any[]>;
  getLocationAnalytics(): Promise<any[]>;

  // Alert methods
  getAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, alert: Partial<Alert>): Promise<Alert | undefined>;
  deleteAlert(id: number): Promise<boolean>;

  // Report methods
  getReports(): Promise<Report[]>;
  getReport(id: number): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private devices: Map<number, Device>;
  private deviceUsage: Map<number, DeviceUsage>;
  private deviceLocations: Map<number, DeviceLocation>;
  private alerts: Map<number, Alert>;
  private reports: Map<number, Report>;
  private currentUserId: number;
  private currentDeviceId: number;
  private currentUsageId: number;
  private currentLocationId: number;
  private currentAlertId: number;
  private currentReportId: number;

  constructor() {
    this.users = new Map();
    this.devices = new Map();
    this.deviceUsage = new Map();
    this.deviceLocations = new Map();
    this.alerts = new Map();
    this.reports = new Map();
    this.currentUserId = 1;
    this.currentDeviceId = 1;
    this.currentUsageId = 1;
    this.currentLocationId = 1;
    this.currentAlertId = 1;
    this.currentReportId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      email: "admin@company.com",
      password: "hashed_password",
      role: "admin",
      status: "active",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date()
    };
    this.users.set(adminUser.id, adminUser);

    const normalUser: User = {
      id: this.currentUserId++,
      username: "user",
      email: "user@company.com",
      password: "hashed_password",
      role: "user",
      status: "active",
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      createdAt: new Date()
    };
    this.users.set(normalUser.id, normalUser);

    // Initialize devices
    const sampleDevices: Device[] = [
      {
        id: this.currentDeviceId++,
        label: "DEV-001",
        imei: "123456789012345",
        status: "online",
        networkProvider: "Verizon",
        location: "New York, NY",
        country: "US",
        signalStrength: 98,
        batteryLevel: 85,
        ipAddress: "192.168.1.100",
        lastSeen: new Date(Date.now() - 2 * 60 * 1000),
        assignedUserId: adminUser.id,
        createdAt: new Date()
      },
      {
        id: this.currentDeviceId++,
        label: "DEV-042",
        imei: "987654321098765",
        status: "online",
        networkProvider: "AT&T",
        location: "Chicago, IL",
        country: "US",
        signalStrength: 76,
        batteryLevel: 92,
        ipAddress: "192.168.1.101",
        lastSeen: new Date(Date.now() - 1 * 60 * 1000),
        assignedUserId: adminUser.id,
        createdAt: new Date()
      },
      {
        id: this.currentDeviceId++,
        label: "DEV-078",
        imei: "456789012345678",
        status: "offline",
        networkProvider: "T-Mobile",
        location: "Los Angeles, CA",
        country: "US",
        signalStrength: 0,
        batteryLevel: 45,
        ipAddress: null,
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
        assignedUserId: normalUser.id,
        createdAt: new Date()
      }
    ];

    sampleDevices.forEach(device => this.devices.set(device.id, device));

    // Initialize alerts
    const sampleAlerts: Alert[] = [
      {
        id: this.currentAlertId++,
        type: "usage",
        title: "High Data Usage - DEV-042",
        message: "Device has exceeded 80% of monthly limit",
        severity: "high",
        status: "active",
        deviceId: 2,
        triggerConditions: { threshold: 80, currentUsage: 85 },
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
        resolvedAt: null
      },
      {
        id: this.currentAlertId++,
        type: "connectivity",
        title: "Device Offline - DEV-078",
        message: "Device has been offline for 2 hours",
        severity: "critical",
        status: "active",
        deviceId: 3,
        triggerConditions: { maxOfflineTime: 120 },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        resolvedAt: null
      }
    ];

    sampleAlerts.forEach(alert => this.alerts.set(alert.id, alert));

    // Initialize reports
    const sampleReports: Report[] = [
      {
        id: this.currentReportId++,
        name: "Monthly Usage Report - December 2023",
        type: "usage",
        format: "pdf",
        parameters: { timeRange: "30d", devices: "all" },
        generatedBy: adminUser.id,
        filePath: "/reports/usage-dec-2023.pdf",
        status: "completed",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 23 * 60 * 60 * 1000)
      }
    ];

    sampleReports.forEach(report => this.reports.set(report.id, report));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "user",
      status: insertUser.status || "active",
      createdAt: new Date(),
      lastLogin: null
    };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getDevices(filters?: DeviceFilters): Promise<Device[]> {
    let devices = Array.from(this.devices.values());
    
    if (filters?.status && filters.status !== "all") {
      devices = devices.filter(device => device.status === filters.status);
    }
    
    if (filters?.network && filters.network !== "all") {
      devices = devices.filter(device => 
        device.networkProvider.toLowerCase().includes(filters.network!.toLowerCase())
      );
    }
    
    return devices;
  }

  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.currentDeviceId++;
    const device: Device = { 
      ...insertDevice, 
      id,
      status: insertDevice.status || "offline",
      location: insertDevice.location || null,
      country: insertDevice.country || null,
      signalStrength: insertDevice.signalStrength || null,
      batteryLevel: insertDevice.batteryLevel || null,
      ipAddress: insertDevice.ipAddress || null,
      assignedUserId: insertDevice.assignedUserId || null,
      createdAt: new Date(),
      lastSeen: new Date()
    };
    this.devices.set(id, device);
    return device;
  }

  async updateDevice(id: number, deviceData: Partial<Device>): Promise<Device | undefined> {
    const device = this.devices.get(id);
    if (!device) return undefined;
    
    const updatedDevice = { ...device, ...deviceData };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }

  async deleteDevice(id: number): Promise<boolean> {
    return this.devices.delete(id);
  }

  async getDeviceUsage(deviceId: number, timeRange: string): Promise<DeviceUsage[]> {
    // Return mock usage data for the device
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const usage: DeviceUsage[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      usage.push({
        id: this.currentUsageId++,
        deviceId,
        date,
        dataUsage: (Math.random() * 5).toString(), // Random usage between 0-5 GB
        cost: (Math.random() * 50).toString(),
        createdAt: new Date()
      });
    }
    
    return usage;
  }

  async getDeviceLocations(deviceId: number): Promise<DeviceLocation[]> {
    // Return mock location data
    return [
      {
        id: this.currentLocationId++,
        deviceId,
        latitude: "40.7128",
        longitude: "-74.0060",
        accuracy: 10,
        timestamp: new Date(),
        createdAt: new Date()
      }
    ];
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const allDevices = Array.from(this.devices.values());
    const onlineDevices = allDevices.filter(d => d.status === "online");
    const offlineDevices = allDevices.filter(d => d.status === "offline");
    const activeAlerts = Array.from(this.alerts.values()).filter(a => a.status === "active");
    const usageAlerts = activeAlerts.filter(a => a.type === "usage");
    const connectionAlerts = activeAlerts.filter(a => a.type === "connectivity");
    
    const avgSignal = Math.round(
      allDevices.reduce((sum, device) => sum + (device.signalStrength || 0), 0) / allDevices.length
    );

    return {
      totalDevices: allDevices.length,
      onlineDevices: onlineDevices.length,
      offlineDevices: offlineDevices.length,
      monthlyUsage: "2.4 TB",
      usagePercentage: 78,
      activeAlerts: activeAlerts.length,
      usageAlerts: usageAlerts.length,
      connectionAlerts: connectionAlerts.length,
      avgSignal
    };
  }

  async getUsageAnalytics(timeRange: string): Promise<any[]> {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        usage: Math.floor(Math.random() * 100) + 50 // Random usage between 50-150 GB
      });
    }
    
    return data;
  }

  async getDeviceAnalytics(timeRange: string): Promise<any[]> {
    return [
      { status: "online", count: 298, color: "hsl(var(--success))" },
      { status: "offline", count: 26, color: "hsl(var(--destructive))" },
      { status: "error", count: 3, color: "hsl(var(--warning))" }
    ];
  }

  async getLocationAnalytics(): Promise<any[]> {
    return Array.from(this.devices.values()).map(device => ({
      id: device.id.toString(),
      deviceId: device.id.toString(),
      deviceLabel: device.label,
      latitude: 40.7128 + (Math.random() - 0.5) * 0.1,
      longitude: -74.0060 + (Math.random() - 0.5) * 0.1,
      status: device.status,
      lastSeen: device.lastSeen?.toISOString() || new Date().toISOString()
    }));
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.currentAlertId++;
    const alert: Alert = { 
      ...insertAlert, 
      id,
      status: insertAlert.status || "active",
      deviceId: insertAlert.deviceId || null,
      createdAt: new Date(),
      resolvedAt: null
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: number, alertData: Partial<Alert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert = { ...alert, ...alertData };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async deleteAlert(id: number): Promise<boolean> {
    return this.alerts.delete(id);
  }

  async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  async getReport(id: number): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.currentReportId++;
    const report: Report = { 
      ...insertReport, 
      id,
      status: insertReport.status || "pending",
      filePath: insertReport.filePath || null,
      createdAt: new Date(),
      completedAt: null
    };
    this.reports.set(id, report);
    return report;
  }
}

export const storage = new MemStorage();
