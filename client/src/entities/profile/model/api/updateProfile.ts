import { UpdateProfileRequest, Profile } from '../types';
import { client } from '@/shared/api/client';

export async function updateProfile(
  data: UpdateProfileRequest,
): Promise<Profile> {
  return client.put<Profile>('/profile', data);
} 