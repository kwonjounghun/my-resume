import { Retrospective } from '../model/types';

export async function updateRetrospective(
  id: number,
  data: Partial<Omit<Retrospective, 'id' | 'createdAt' | 'updatedAt' | 'summary'>>
): Promise<Retrospective> {
  const response = await fetch(`/api/retrospectives/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update retrospective');
  }

  return response.json();
} 