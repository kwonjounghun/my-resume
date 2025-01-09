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
  summary?: string;
  task?: string;
  action?: string;
  result?: string;
  isPublic: boolean;
  keywords?: string[];
}

export type UpdateProjectDto = Partial<CreateProjectDto>;

export const getProjects = ({
  page = 1,
  limit = 10,
  keyword,
  sortOrder,
  searchField,
}: GetProjectsParams = {}) => {
  const params: Record<string, string> = {};
  if (page) params.page = page.toString();
  if (limit) params.limit = limit.toString();
  if (keyword) params.keyword = keyword;
  if (sortOrder) params.sortOrder = sortOrder;
  if (searchField) params.searchField = searchField;

  return client.get<ProjectsResponse>('/projects', { params });
};

export const projectApi = {
  create: (data: CreateProjectDto) => {
    return client.post<Project>('/projects', data);
  },
  getById: (id: string) => {
    return client.get<Project>(`/projects/${id}`);
  },
  update: (id: string, data: UpdateProjectDto) => {
    return client.patch<Project>(`/projects/${id}`, data);
  },
  summarize: (id: string) => {
    return client.post<Project>(`/projects/${id}/summarize`);
  },
}; 