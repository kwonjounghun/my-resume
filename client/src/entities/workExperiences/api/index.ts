import { client } from '@/shared/api/client';
import { WorkExperience, CreateWorkExperience } from '@/entities/workExperiences/model';


export interface CreateWorkExperienceDto {
  company: string;
  startDate: string;
  endDate: string;
}

export const getWorkExperiences = () => {
  return client.get<{
    workExperiences: WorkExperience[];
    total: number;
  }>('/work-experiences')
};

export const createWorkExperience = (workExperience: CreateWorkExperience) => {
  return client.post<WorkExperience>('/work-experiences', workExperience);
};
