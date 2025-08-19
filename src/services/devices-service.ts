import { handleApiError } from "@/error";
import { DevicesResponse } from "@/types-and-interface/device.interface";
import axios, { type AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_PRODUCTION;

export const getDevicesApi = async (): Promise<{
  success: boolean;
  data?: any[];
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
    const response = await axios.get<DevicesResponse>(`${BASE_URL}/organization/org/devices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      return {
        success: false,
        error: response.data.error || "Unknown error",
      };
    }

    return {
      success: true,
      data: response.data.devices,
    };
  } catch (error) {
    const errorResult = handleApiError(error);
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
