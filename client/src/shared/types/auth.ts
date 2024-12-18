export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginError {
  message: string;
  statusCode: number;
} 