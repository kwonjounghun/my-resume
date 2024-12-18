import { Introduction } from '../model/types';
import { client } from '@/shared/api/client';

export const getIntroduction = async (id: string): Promise<Introduction> => {
  return client.get<Introduction>(`/introductions/${id}`);
} 