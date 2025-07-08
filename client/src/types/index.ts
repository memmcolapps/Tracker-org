export interface DashboardStats {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  monthlyUsage: string;
  usagePercentage: number;
  activeAlerts: number;
  usageAlerts: number;
  connectionAlerts: number;
  avgSignal: number;
}

export interface UsageData {
  date: string;
  usage: number;
  cost?: number;
}

export interface DeviceStatus {
  status: string;
  count: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'online' | 'offline' | 'alert' | 'location';
  device: string;
  message: string;
  timestamp: string;
  icon: string;
  color: string;
}

export interface LocationPoint {
  id: string;
  deviceId: string;
  deviceLabel: string;
  latitude: number;
  longitude: number;
  status: string;
  lastSeen: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    tension?: number;
  }[];
}
