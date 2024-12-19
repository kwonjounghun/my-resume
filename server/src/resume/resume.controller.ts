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
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('resumes')
@UseGuards(AuthGuard('jwt'))
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) { }

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
} 