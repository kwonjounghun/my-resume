import { Retrospective } from '../model/types';

export async function summarizeRetrospective(id: number): Promise<Retrospective> {
  const response = await fetch(`/api/retrospectives/${id}/summarize`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to summarize retrospective');
  }

  return response.json();
} 