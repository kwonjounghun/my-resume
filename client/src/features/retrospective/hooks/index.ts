import { useQuery } from '@tanstack/react-query';
import { getRetrospectives } from '@/entities/retrospective/api/getRetrospectives';

export const useRetrospectives = () => {
  return useQuery({
    queryKey: ['retrospectives'],
    queryFn: () => getRetrospectives(),
  });
};
