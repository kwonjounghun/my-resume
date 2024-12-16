import { Retrospective } from '../model/types';

export async function getRetrospective(id: number): Promise<Retrospective> {
  const response = await fetch(`/api/retrospectives/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch retrospective');
  }

  return response.json();
} 