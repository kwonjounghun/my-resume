import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkExperienceController } from './interface/work-experience.controller';
import { WorkExperienceService } from './application/work-experience.service';
import { WorkExperienceDocument, WorkExperienceSchema } from './infrastructure/mongodb/work-experience.schema';
import { WorkExperienceRepositoryImpl } from './infrastructure/mongodb/work-experience.repository.impl';
import { WORK_EXPERIENCE_REPOSITORY } from './domain/work-experience.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkExperienceDocument.name, schema: WorkExperienceSchema },
    ]),
  ],
  controllers: [WorkExperienceController],
  providers: [
    WorkExperienceService,
    {
      provide: WORK_EXPERIENCE_REPOSITORY,
      useClass: WorkExperienceRepositoryImpl,
    },
  ],
  exports: [WorkExperienceService],
})
export class WorkExperienceModule { } 