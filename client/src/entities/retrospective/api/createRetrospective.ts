import { client } from '@/shared/api/client';
import { CreateRetrospectiveRequest, Retrospective } from '../model/types';

export async function createRetrospective(
  data: CreateRetrospectiveRequest
): Promise<Retrospective> {
  return client.post('/retrospectives', data);
}
