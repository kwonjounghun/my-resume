import { Profile, CreateProfileRequest, UpdateProfileRequest } from '../model/types';
import { client } from '@/shared/api/client';

export async function getProfile() {
  const response = await client.get<{ profile: Profile }>('/profile');
  return response.profile;
}

export async function createProfile(data: CreateProfileRequest) {
  const response = await client.post<{ profile: Profile }>('/profile', data);
  return response.profile;
}

export async function updateProfile(data: UpdateProfileRequest) {
  const response = await client.put<{ profile: Profile }>('/profile', data);
  return response.profile;
}

export async function deleteProfile() {
  await client.delete('/profile');
} 