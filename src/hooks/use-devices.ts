import { getDevicesApi } from "@/services/devices-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const result = await getDevicesApi();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};
