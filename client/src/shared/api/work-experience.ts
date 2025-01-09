import { client } from './client';

export interface WorkExperience {
  id: string;
  company: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkExperiencesResponse {
  workExperiences: WorkExperience[];
  total: number;
}

export const workExperienceApi = {
  getAll: () => {
    return client.get<WorkExperiencesResponse>('/work-experiences');
  },
};
