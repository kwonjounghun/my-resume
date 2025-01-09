import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PROJECT_REPOSITORY } from '../domain/project.repository';
import { ProjectRepository } from '../domain/project.repository';
import { OpenAIService } from '../../common/services/openai.service';

@Injectable()
export class SummarizeProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private projectRepository: ProjectRepository,
    private openAIService: OpenAIService,
  ) { }

  async execute(id: string, userId: string) {
    const project = await this.projectRepository.findById(id, userId);

    if (!project.situation || !project.task || !project.action || !project.result) {
      throw new UnauthorizedException('STAR 내용이 모두 작성되어야 요약할 수 있습니다.');
    }

    if (project.summary) {
      throw new UnauthorizedException('이미 요약이 작성되어 있습니다.');
    }

    try {
      const { summary, keywords } = await this.openAIService.summarizeProject(
        project.situation,
        project.task,
        project.action,
        project.result,
      );

      const updated = await this.projectRepository.update(id, {
        ...project,
        summary,
        keywords,
      }, userId);

      return updated;
    } catch (error) {
      console.error('Summarize Error:', error);
      throw new Error('프로젝트 요약 생성에 실패했습니다.');
    }
  }
} 