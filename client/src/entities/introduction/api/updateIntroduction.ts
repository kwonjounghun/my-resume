import { Introduction } from '../model/types';

interface UpdateIntroductionData {
  title: string;
  content: string;
}

export async function updateIntroduction(
  id: number,
  data: UpdateIntroductionData
): Promise<Introduction> {
  const response = await fetch(`/api/introductions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update introduction');
  }

  return response.json();
} 