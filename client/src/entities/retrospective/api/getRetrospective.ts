import { client } from '@/shared/api/client';
import { Retrospective } from '../model/types';

export async function getRetrospective(id: string): Promise<Retrospective> {
  return client.get(`/retrospectives/${id}`);
} 
