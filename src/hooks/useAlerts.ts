import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, InsertAlert } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function useAlerts() {
  return useQuery<Alert[]>({
    queryKey: ['/api/alerts'],
    staleTime: 30000,
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alert: InsertAlert) => {
      const response = await apiRequest('POST', '/api/alerts', alert);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
    },
  });
}

export function useUpdateAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...alert }: { id: number } & Partial<Alert>) => {
      const response = await apiRequest('PATCH', `/api/alerts/${id}`, alert);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
    },
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
    },
  });
}
