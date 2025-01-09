import { Injectable, Inject } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../domain/project.repository';
import { ProjectRepository } from '../domain/project.repository';
import { Project } from '../domain/project.entity';

interface CreateProjectParams {
  userId: string;
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

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
  ) { }

  async execute(params: CreateProjectParams): Promise<Project> {
    const project = new Project({
      ...params,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.projectRepository.create(project);
  }
} 