import { ProfileResponse } from '../types';
import { client } from '@/shared/api/client';

export async function getProfile(): Promise<ProfileResponse> {
  return client.get<ProfileResponse>('/profile');
} 