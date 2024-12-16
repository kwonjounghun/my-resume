import { Introduction } from '../model/types';

export type CreateIntroductionRequest = Pick<Introduction, 'title' | 'content'>;

export async function createIntroduction(
  data: CreateIntroductionRequest
): Promise<Introduction> {
  const response = await fetch('/api/introductions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create introduction');
  }

  return response.json();
} 