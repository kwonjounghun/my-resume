import { Project } from './project.entity';

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';

export interface ProjectRepository {
  create(project: Project): Promise<Project>;
  findById(id: string, userId: string): Promise<Project>;
  update(id: string, project: Partial<Project>, userId: string): Promise<Project>;
  findAll(params: {
    userId: string;
    page?: number;
    limit?: number;
    keyword?: string;
    sortBy?: 'startDate' | 'endDate' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{
    projects: Project[];
    total: number;
  }>;
} 