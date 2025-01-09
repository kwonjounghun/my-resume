import { Injectable, Inject } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../domain/project.repository';
import { ProjectRepository } from '../domain/project.repository';
import { Project } from '../domain/project.entity';

@Injectable()
export class GetProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
  ) { }

  async execute(id: string, userId: string): Promise<Project> {
    return this.projectRepository.findById(id, userId);
  }
} 