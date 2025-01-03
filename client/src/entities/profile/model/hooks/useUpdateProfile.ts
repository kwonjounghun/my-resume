import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileRequest } from '../types';
import { updateProfile } from '../api/updateProfile';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
} 