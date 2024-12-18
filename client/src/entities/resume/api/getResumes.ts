import { Resume } from '../model/types';
import { client } from '@/shared/api/client';

interface GetResumesParams {
  page?: number;
  limit?: number;
}

interface GetResumesResponse {
  resumes: Resume[];
  total: number;
}

export const getResumes = async ({
  page = 1,
  limit = 10,
}: GetResumesParams = {}): Promise<GetResumesResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return client.get<GetResumesResponse>(`/resumes?${params}`);
} 