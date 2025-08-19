interface DeviceCoordinates {
  cellId: string;
  accuracy: number;
  latitude: number;
  longitude: number;
}

interface UsageLimit {
  type: "monthly";
  used: number | null;
  total: number;
  period: string;
  resets_at: string;
  alert_threshold: number | null;
}

interface Tag {
  name: string;
  id: string;
  can_write: boolean;
  color: string;
}

export interface Device {
  id: string;
  name: string;
  model: string;
  simType: string;
  simNumber: string;
  coordinates: DeviceCoordinates;
  status: string;
  organizationId: string;
  usage: number;
  usageLimit: UsageLimit;
  lastOnlineAt: string;
  tags: Tag[];
  organizationName: string;
  type: "CAR" | "WALKIE"; // Assuming other possible types
  createdAt: string;
  updatedAt: string;
}

export interface DevicesResponse {
  success: boolean;
  devices: Device[];
  error?: string;
}
