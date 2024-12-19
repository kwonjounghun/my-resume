import { client } from '@/shared/api/client';

export async function deleteRetrospective(id: string): Promise<void> {
  return client.delete(`/retrospectives/${id}`);
}
