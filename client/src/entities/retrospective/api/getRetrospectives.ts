import { RetrospectiveFilters, RetrospectiveListResponse } from '../model/types';

export async function getRetrospectives(
  filters?: RetrospectiveFilters
): Promise<RetrospectiveListResponse> {
  let url = '/api/retrospectives';

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
    throw new Error('Failed to fetch retrospectives');
  }

  return response.json();
} 