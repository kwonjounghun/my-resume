import { Resume } from '../model/types';
import { client } from '@/shared/api/client';

interface UpdateResumeData {
  title: string;
  content: string;
  selfIntroductionId: string;
  projects: string[];
  isPublic: boolean;
}

export const updateResume = async (
  id: string,
  data: UpdateResumeData
): Promise<Resume> => {
  return client.put<Resume>(`/resumes/${id}`, data);
}; 