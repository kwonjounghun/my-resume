import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../domain/project.repository';
import { ProjectRepository } from '../domain/project.repository';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
  ) { }

  async execute(id: string, userId: string): Promise<void> {
    const deleted = await this.projectRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }
  }
} 