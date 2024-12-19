import { client } from '@/shared/api/client';
import { CreateRetrospectiveRequest, CreateRetrospectiveResponse } from '../model/types';

export async function createRetrospective(
  data: CreateRetrospectiveRequest
): Promise<CreateRetrospectiveResponse> {
  return client.post('/retrospectives', data);
}
