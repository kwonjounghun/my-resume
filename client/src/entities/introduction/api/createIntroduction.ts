import { Introduction } from '../model/types';
import { client } from '@/shared/api/client';

interface CreateIntroductionData {
  title?: string;
  content?: string;
}

export const createIntroduction = async (data: CreateIntroductionData): Promise<Introduction> => {
  return client.post<Introduction>('/introductions', data);
} 