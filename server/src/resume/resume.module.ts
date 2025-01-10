import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { Resume, ResumeSchema } from './schemas/resume.schema';
import { PdfService } from './services/pdf.service';
import { ProfileModule } from '../profile/profile.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resume.name, schema: ResumeSchema },
    ]),
    ProfileModule,
    ProjectModule,
  ],
  controllers: [ResumeController],
  providers: [ResumeService, PdfService],
  exports: [ResumeService],
})
export class ResumeModule { } 