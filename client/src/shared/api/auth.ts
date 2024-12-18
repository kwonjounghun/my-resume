import { client } from '@/shared/api/client';
import { AuthResponse, User } from '@/shared/types/auth';

export const loginWithGoogle = async (): Promise<void> => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

export const getMe = async (): Promise<User> => {
  const { data } = await client.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await client.post('/auth/logout');
  window.location.href = '/';
}; 