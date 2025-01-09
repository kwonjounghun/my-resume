import { Injectable, Inject } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../domain/project.repository';
import { ProjectRepository } from '../domain/project.repository';
import { CreateProjectDto } from '../interface/dto/create-project.dto';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
  ) { }

  async execute(params: CreateProjectDto & { userId: string }) {

    const project = await this.projectRepository.create({
      ...params
    });

    return project;
  }
} 