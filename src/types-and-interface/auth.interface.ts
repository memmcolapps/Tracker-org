export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserLoginResponse {
  message?: string;
  token?: string;
  user?: User;
  success: boolean;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
