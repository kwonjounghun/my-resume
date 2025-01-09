import { SearchField } from '@/features/project/model/types';
import { SortOrder } from '@/features/project/model/types';
import { client } from './client';

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sortOrder?: SortOrder;
  searchField?: SearchField;
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

export interface Project {
  id: string;
  title: string;
  workExperienceId: string;
  startDate: string;
  endDate: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  isPublic: boolean;
  keywords?: string[];
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDto {
  title: string;
  workExperienceId: string;
  startDate: string;
  endDate: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  isPublic: boolean;
}

export const projectApi = {
  create: (data: CreateProjectDto) => {
    return client.post<Project>('/projects', data);
  },
  getById: (id: string) => {
    return client.get<Project>(`/projects/${id}`);
  },
  summarize: (id: string) => {
    return client.post<Project>(`/projects/${id}/summarize`);
  },
}; 