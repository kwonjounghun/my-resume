import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetProjectsUseCase } from '../application/get-projects.usecase';
import { GetProjectUseCase } from '../application/get-project.usecase';
import { CreateProjectUseCase } from '../application/create-project.usecase';
import { UpdateProjectUseCase } from '../application/update-project.usecase';
import { DeleteProjectUseCase } from '../application/delete-project.usecase';
import { SummarizeProjectUseCase } from '../application/summarize-project.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    private getProjectsUseCase: GetProjectsUseCase,
    private getProjectUseCase: GetProjectUseCase,
    private createProjectUseCase: CreateProjectUseCase,
    private updateProjectUseCase: UpdateProjectUseCase,
    private deleteProjectUseCase: DeleteProjectUseCase,
    private summarizeProjectUseCase: SummarizeProjectUseCase,
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

  @Get(':id')
  @ApiOperation({ summary: '프로젝트 상세 조회' })
  @ApiResponse({ status: 200, description: '프로젝트를 성공적으로 조회했습니다.' })
  async getProject(
    @Param('id') id: string,
    @CurrentUser() userId: string,
  ) {
    return this.getProjectUseCase.execute(id, userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false
  }))
  @ApiOperation({ summary: '프로젝트 수정' })
  @ApiResponse({ status: 200, description: '프로젝트가 성공적으로 수정되었습니다.' })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() userId: string,
  ) {
    return this.updateProjectUseCase.execute(id, userId, updateProjectDto);
  }

  @Post(':id/summarize')
  @ApiOperation({ summary: '프로젝트 요약 생성' })
  @ApiResponse({ status: 200, description: '프로젝트 요약이 성공적으로 생성되었습니다.' })
  async summarizeProject(
    @Param('id') id: string,
    @CurrentUser() userId: string,
  ) {
    return this.summarizeProjectUseCase.execute(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: '프로젝트 삭제' })
  @ApiResponse({ status: 200, description: '프로젝트가 성공적으로 삭제되었습니다.' })
  async deleteProject(
    @Param('id') id: string,
    @CurrentUser() userId: string,
  ): Promise<void> {
    await this.deleteProjectUseCase.execute(id, userId);
  }
} 