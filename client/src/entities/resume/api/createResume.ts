import { Resume } from '../model/types';
import { client } from '@/shared/api/client';

interface CreateResumeData {
  title: string;
  content: string;
  selfIntroductionId: string;
  projects: string[];
  isPublic: boolean;
}

export const createResume = async (data: CreateResumeData): Promise<Resume> => {
  return client.post<Resume>('/resumes', data);
} 