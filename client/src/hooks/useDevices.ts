import { useQuery } from "@tanstack/react-query";
import { Device } from "@shared/schema";

export function useDevices() {
  return useQuery<Device[]>({
    queryKey: ['/api/devices'],
    staleTime: 30000, // 30 seconds
  });
}

export function useDevice(id: string) {
  return useQuery<Device>({
    queryKey: ['/api/devices', id],
    staleTime: 30000,
    enabled: !!id,
  });
}

export function useDeviceUsage(deviceId: string, timeRange: string = '30d') {
  return useQuery({
    queryKey: ['/api/devices', deviceId, 'usage', timeRange],
    staleTime: 60000, // 1 minute
    enabled: !!deviceId,
  });
}

export function useDeviceLocations(deviceId: string) {
  return useQuery({
    queryKey: ['/api/devices', deviceId, 'locations'],
    staleTime: 30000,
    enabled: !!deviceId,
  });
}
