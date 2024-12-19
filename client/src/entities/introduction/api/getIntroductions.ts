import { Introduction } from '../model/types';
import { client } from '@/shared/api/client';

interface GetIntroductionsParams {
  page?: number;
  limit?: number;
}

interface GetIntroductionsResponse {
  introductions: Introduction[];
  total: number;
}

export const getIntroductions = async ({
  page = 1,
  limit = 10,
}: GetIntroductionsParams = {}): Promise<GetIntroductionsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return client.get<GetIntroductionsResponse>(`/introductions?${params}`);
} 