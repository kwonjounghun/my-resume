import { Injectable, Inject } from '@nestjs/common';
import { ProjectRepository } from '../domain/project.repository';
import { PROJECT_REPOSITORY } from '../domain/project.repository';

interface GetProjectsParams {
  userId: string;
  page?: number;
  limit?: number;
  keyword?: string;
  sortBy?: 'startDate' | 'endDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class GetProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository
  ) { }

  async execute(params: GetProjectsParams) {
    return this.projectRepository.findAll(params);
  }
} 