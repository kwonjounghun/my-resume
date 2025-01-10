import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectDocument, ProjectSchema } from './infrastructure/mongodb/project.schema';
import { ProjectRepositoryImpl } from './infrastructure/mongodb/project.repository.impl';
import { GetProjectsUseCase } from './application/get-projects.usecase';
import { GetProjectUseCase } from './application/get-project.usecase';
import { CreateProjectUseCase } from './application/create-project.usecase';
import { UpdateProjectUseCase } from './application/update-project.usecase';
import { DeleteProjectUseCase } from './application/delete-project.usecase';
import { SummarizeProjectUseCase } from './application/summarize-project.usecase';
import { ProjectController } from './interface/project.controller';
import { PROJECT_REPOSITORY } from './domain/project.repository';
import { OpenAIModule } from '../common/services/openai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectDocument.name, schema: ProjectSchema },
    ]),
    OpenAIModule,
  ],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepositoryImpl,
    },
    GetProjectsUseCase,
    GetProjectUseCase,
    CreateProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
    SummarizeProjectUseCase,
  ],
  controllers: [ProjectController],
  exports: [PROJECT_REPOSITORY],
})
export class ProjectModule { }