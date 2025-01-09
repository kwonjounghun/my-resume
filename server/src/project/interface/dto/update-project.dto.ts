import { IsString, IsOptional, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: '프로젝트 제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '회사 ID' })
  @IsOptional()
  @IsString()
  workExperienceId?: string;

  @ApiPropertyOptional({ description: '시작일' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: '종료일' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: '상황' })
  @IsOptional()
  @IsString()
  situation?: string;

  @ApiPropertyOptional({ description: '과제' })
  @IsOptional()
  @IsString()
  task?: string;

  @ApiPropertyOptional({ description: '행동' })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiPropertyOptional({ description: '결과' })
  @IsOptional()
  @IsString()
  result?: string;

  @ApiPropertyOptional({ description: '요약' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: '공개 여부' })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ description: '키워드 목록' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
} 