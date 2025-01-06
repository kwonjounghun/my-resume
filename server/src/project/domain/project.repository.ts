import { Project } from './project.entity';

export const PROJECT_REPOSITORY = 'PROJECT_REPOSITORY';

export interface ProjectRepository {
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