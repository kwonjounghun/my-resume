import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { WorkExperienceService } from '../application/work-experience.service';

@ApiTags('work-experiences')
@Controller('work-experiences')
@UseGuards(JwtAuthGuard)
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) { }

  @Post()
  @ApiOperation({ summary: '경력 정보 생성' })
  @ApiResponse({ status: 201, description: '경력 정보가 성공적으로 생성되었습니다.' })
  create(@Body() createWorkExperienceDto: CreateWorkExperienceDto, @CurrentUser() userId: string) {
    return this.workExperienceService.create(createWorkExperienceDto, userId);
  }

  @Get()
  @ApiOperation({ summary: '경력 정보 목록 조회' })
  @ApiResponse({ status: 200, description: '경력 정보 목록을 성공적으로 조회했습니다.' })
  findAll(@CurrentUser() userId: string) {
    return this.workExperienceService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '경력 정보 상세 조회' })
  @ApiResponse({ status: 200, description: '경력 정보를 성공적으로 조회했습니다.' })
  findOne(@Param('id') id: string, @CurrentUser() userId: string) {
    return this.workExperienceService.findOne(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: '경력 정보 수정' })
  @ApiResponse({ status: 200, description: '경력 정보가 성공적으로 수정되었습니다.' })
  update(
    @Param('id') id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
    @CurrentUser() userId: string,
  ) {
    return this.workExperienceService.update(id, updateWorkExperienceDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: '경력 정보 삭제' })
  @ApiResponse({ status: 200, description: '경력 정보가 성공적으로 삭제되었습니다.' })
  remove(@Param('id') id: string, @CurrentUser() userId: string) {
    return this.workExperienceService.remove(id, userId);
  }
} 