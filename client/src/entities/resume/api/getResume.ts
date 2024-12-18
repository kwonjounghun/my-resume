import { Resume } from '../model/types';
import { client } from '@/shared/api/client';

export const getResume = async (id: string): Promise<Resume> => {
  return client.get<Resume>(`/resumes/${id}`);
}; 