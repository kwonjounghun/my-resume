import { client } from '@/shared/api/client';
import { Retrospective } from '../model/types';

export async function summarizeRetrospective(id: string): Promise<Retrospective> {
  return client.post(`/retrospectives/${id}/summarize`);
} 