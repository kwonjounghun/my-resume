import { IntroductionFilters, IntroductionListResponse } from '../model/types';

export async function getIntroductions(
  filters?: IntroductionFilters
): Promise<IntroductionListResponse> {
  let url = '/api/introductions';

  if (filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch introductions');
  }

  return response.json();
} 