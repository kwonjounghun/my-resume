import { IsString, IsNotEmpty, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: '프로젝트 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '회사 이름' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: '회사 ID' })
  @IsString()
  @IsNotEmpty()
  workExperienceId: string;

  @ApiProperty({ description: '시작일', example: '2021-01' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: '종료일', example: '2021-12' })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: '상황 설명' })
  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  situation?: string;

  @ApiProperty({ description: '과제 설명' })
  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  task?: string;

  @ApiProperty({ description: '행동 설명' })
  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  action?: string;

  @ApiProperty({ description: '결과 설명' })
  @IsString()
  @MinLength(50)
  @MaxLength(2000)
  result?: string;

  @ApiProperty({ description: '공개 여부' })
  @IsBoolean()
  isPublic: boolean;
} 