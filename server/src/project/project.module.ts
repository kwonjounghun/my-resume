import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectDocument, ProjectSchema } from './infrastructure/mongodb/project.schema';
import { ProjectRepositoryImpl } from './infrastructure/mongodb/project.repository.impl';
import { GetProjectsUseCase } from './application/get-projects.usecase';
import { ProjectController } from './interface/project.controller';
import { PROJECT_REPOSITORY } from './domain/project.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectDocument.name, schema: ProjectSchema },
    ]),
  ],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepositoryImpl,
    },
    GetProjectsUseCase,
  ],
  controllers: [ProjectController],
})
export class ProjectModule { } 