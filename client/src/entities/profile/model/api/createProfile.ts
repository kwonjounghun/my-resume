import { CreateProfileRequest, Profile } from '../types';
import { client } from '@/shared/api/client';

export async function createProfile(
  data: CreateProfileRequest,
): Promise<Profile> {
  return client.post<Profile>('/profile', data)
} 