import { getAdminsApi } from "@/services/admin-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAdmins = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await getAdminsApi();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.users;
    },
  });
};
