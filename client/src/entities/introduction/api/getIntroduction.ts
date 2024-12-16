import { Introduction } from '../model/types';

export async function getIntroduction(id: number): Promise<Introduction> {
  const response = await fetch(`/api/introductions/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch introduction');
  }

  return response.json();
} 