import { client } from '@/shared/api/client';
import { AuthResponse, User } from '@/shared/types/auth';

export const loginWithGoogle = async (returnUrl?: string): Promise<void> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  const url = returnUrl ? `${baseUrl}?returnUrl=${encodeURIComponent(returnUrl)}` : baseUrl;
  window.location.href = url;
};

export const getMe = async (): Promise<User> => {
  const data = await client.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await client.post('/auth/logout');
  client.clearToken();
  window.location.href = '/';
}; 