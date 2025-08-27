import { handleApiError } from "@/error";
import axios, { type AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_PRODUCTION;

interface AdminResponse {
  success: boolean;
  users: Admin[];
  error?: string;
}

interface Admin {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  organizationId: string;
  role: string;
  updatedAt: string;
}

export const getAdminsApi = async (): Promise<{
  success: boolean;
  users?: Admin[];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("authUserToken");
    if (!token) {
      return {
        success: false,
        error: "User is not authenticated",
      };
    }
    const response = await axios.get<AdminResponse>(
      `${BASE_URL}/user/getusers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) {
      return {
        success: false,
        error: response.data.error || "Unknown error",
      };
    }
    console.log(response.data);

    return {
      success: true,
      users: response.data.users,
    };
  } catch (error) {
    const errorResult = handleApiError(error);
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
