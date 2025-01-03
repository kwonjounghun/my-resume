import { useQuery } from '@tanstack/react-query';
import { ProfileResponse } from '../types';
import { getProfile } from '../api/getProfile';

export function useProfile() {
  return useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
} 