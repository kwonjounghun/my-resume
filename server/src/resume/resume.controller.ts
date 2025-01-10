import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Response } from 'express';
import { PdfService } from './services/pdf.service';
import { ProfileService } from '../profile/profile.service';
import { ProjectRepository, PROJECT_REPOSITORY } from '../project/domain/project.repository';

@Controller('resumes')
@UseGuards(AuthGuard('jwt'))
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly pdfService: PdfService,
    private readonly profileService: ProfileService,
    @Inject(PROJECT_REPOSITORY) private readonly projectRepository: ProjectRepository,
  ) { }

  @Post()
  create(@Body() createResumeDto: CreateResumeDto, @Req() req) {
    return this.resumeService.create(createResumeDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.resumeService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.resumeService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @Req() req,
  ) {
    return this.resumeService.update(id, updateResumeDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.resumeService.remove(id, req.user.id);
  }

  @Get(':id/pdf')
  async downloadPdf(
    @Param('id') id: string,
    @CurrentUser() userId: string,
    @Res() res: Response
  ) {
    const resume = await this.resumeService.findOne(id, userId);
    const profile = await this.profileService.findByUserId(userId);

    const projectPromises = resume.projects.map(projectId =>
      this.projectRepository.findById(projectId, userId)
    );
    const projects = await Promise.all(projectPromises);

    const pdf = await this.pdfService.generatePdf(resume, profile, projects);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume-${id}.pdf"`,
      'Content-Length': pdf.length,
    });

    res.send(pdf);
  }
} 