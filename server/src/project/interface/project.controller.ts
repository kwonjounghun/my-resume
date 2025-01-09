import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { GetProjectsUseCase } from '../application/get-projects.usecase';
import { CreateProjectUseCase } from '../application/create-project.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    private getProjectsUseCase: GetProjectsUseCase,
    private createProjectUseCase: CreateProjectUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: '프로젝트 생성' })
  @ApiResponse({ status: 201, description: '프로젝트가 성공적으로 생성되었습니다.' })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() userId: string,
  ) {
    const project = await this.createProjectUseCase.execute({
      ...createProjectDto,
      userId,
    });

    return project;
  }

  @Get()
  @ApiOperation({ summary: '프로젝트 목록 조회' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['startDate', 'endDate', 'createdAt'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  async getProjects(
    @CurrentUser() userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('keyword') keyword?: string,
    @Query('sortBy') sortBy?: 'startDate' | 'endDate' | 'createdAt',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    const result = await this.getProjectsUseCase.execute({
      userId,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      keyword,
      sortBy,
      sortOrder,
    });

    return {
      projects: result.projects,
      total: result.total,
      page: page || 1,
      limit: limit || 10,
    };
  }
} 