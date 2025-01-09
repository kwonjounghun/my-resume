import { SearchField } from '@/features/project/model/types';
import { SortOrder } from '@/features/project/model/types';
import { Project } from '../types/project';
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

export const getProjects = async (params: GetProjectsParams = {}): Promise<ProjectsResponse> => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.keyword) searchParams.append('keyword', params.keyword);

  return client.get(`/projects?${searchParams.toString()}`)
};

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
}; 