import { client } from '@/shared/api/client';
import { RetrospectiveFilters, RetrospectiveListResponse } from '../model/types';

export async function getRetrospectives(
  filters?: RetrospectiveFilters
): Promise<RetrospectiveListResponse> {
  let url = '/retrospectives';

  if (filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    url += `?${params.toString()}`;
  }

  return client.get(url);
} 