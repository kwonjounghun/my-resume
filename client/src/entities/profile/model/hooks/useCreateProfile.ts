import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProfileRequest } from '../types';
import { createProfile } from '../api/createProfile';

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileRequest) => createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
} 