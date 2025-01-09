import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../domain/project.repository';
import { ProjectRepository } from '../domain/project.repository';
import { UpdateProjectDto } from '../interface/dto/update-project.dto';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
  ) { }

  async execute(id: string, userId: string, updateProjectDto: UpdateProjectDto) {
    // 프로젝트 존재 여부 및 소유권 확인
    const project = await this.projectRepository.findById(id, userId);
    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }

    // 프로젝트 업데이트
    const updated = await this.projectRepository.update(id, updateProjectDto, userId);
    return updated;
  }
} 
