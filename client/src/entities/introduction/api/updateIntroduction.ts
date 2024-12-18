import { Introduction } from '../model/types';
import { client } from '@/shared/api/client';

interface UpdateIntroductionData {
  title: string;
  content: string;
}

export const updateIntroduction = async (
  id: string,
  data: UpdateIntroductionData
): Promise<Introduction> => {
  return client.put<Introduction>(`/introductions/${id}`, data);
} 