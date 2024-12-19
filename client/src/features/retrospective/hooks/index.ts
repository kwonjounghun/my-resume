import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateRetrospectiveRequest } from '@/entities/retrospective/model/types';
import { getRetrospectives } from '@/entities/retrospective/api/getRetrospectives';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';
import { updateRetrospective } from '@/entities/retrospective/api/updateRetrospective';
import { createRetrospective } from '@/entities/retrospective/api/createRetrospective';
import { deleteRetrospective } from '@/entities/retrospective/api/deleteRetrospective';
import { summarizeRetrospective } from '@/entities/retrospective/api/summarizeRetrospective';

export const useRetrospectives = () => {
  return useQuery({
    queryKey: ['retrospectives'],
    queryFn: () => getRetrospectives(),
  });
};

export const useRetrospective = (id: string) => {
  return useQuery({
    queryKey: ['retrospective', id],
    queryFn: () => getRetrospective(id),
    enabled: !!id,
  });
};

export const useRetrospectiveCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRetrospectiveRequest) => {
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : '',
        endDate: data.endDate ? new Date(data.endDate).toISOString() : '',
      };
      return createRetrospective(formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retrospectives'] });
    },
  });
};

export const useRetrospectiveUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: CreateRetrospectiveRequest }) => {
      const formattedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : '',
        endDate: data.endDate ? new Date(data.endDate).toISOString() : '',
      };
      return updateRetrospective(id, formattedData);
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['retrospectives'] });
      queryClient.invalidateQueries({ queryKey: ['retrospective', id] });
    },
  })
};

export const useRetrospectiveDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRetrospective(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retrospectives'] });
    },
  });
};

export const useRetrospectiveSummarize = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => summarizeRetrospective(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ['retrospective', id] });
    },
  });
};  