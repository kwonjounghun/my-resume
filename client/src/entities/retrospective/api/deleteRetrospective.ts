import { client } from '@/shared/api/client';

export async function deleteRetrospective(id: number): Promise<void> {
  return client.delete(`/retrospectives/${id}`);
}
