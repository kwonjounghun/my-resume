import { client } from '@/shared/api/client';
import { Retrospective } from '../model/types';

export async function updateRetrospective(
  id: string,
  data: Partial<Omit<Retrospective, 'id' | 'createdAt' | 'updatedAt' | 'summary'>>
): Promise<Retrospective> {
  return client.put(`/retrospectives/${id}`, data);
} 