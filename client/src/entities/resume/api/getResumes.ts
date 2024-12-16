import { ResumeFilters, ResumeListResponse } from '../model/types';

export async function getResumes(
  filters?: ResumeFilters
): Promise<ResumeListResponse> {
  let url = '/api/resumes';

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
    throw new Error('Failed to fetch resumes');
  }

  return response.json();
} 