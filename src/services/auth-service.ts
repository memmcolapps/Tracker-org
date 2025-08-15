import { handleApiError } from "@/error";
import { LoginCredentials } from "@/types-and-interface/auth.interface";
import axios, { type AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_PRODUCTION;

export const loginApi = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, credentials);
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "login");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};
