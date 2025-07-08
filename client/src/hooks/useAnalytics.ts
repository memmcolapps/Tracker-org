import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "@/types";

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['/api/analytics/dashboard'],
    staleTime: 30000,
  });
}

export function useUsageAnalytics(timeRange: string = '30d') {
  return useQuery({
    queryKey: ['/api/analytics/usage', timeRange],
    staleTime: 60000,
  });
}

export function useDeviceAnalytics(timeRange: string = '30d') {
  return useQuery({
    queryKey: ['/api/analytics/devices', timeRange],
    staleTime: 60000,
  });
}

export function useLocationAnalytics() {
  return useQuery({
    queryKey: ['/api/analytics/locations'],
    staleTime: 60000,
  });
}
