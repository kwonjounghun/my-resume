import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkExperienceDto {
  @ApiProperty({ description: '회사명' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ description: '시작일', example: '2021-01-01' })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: '종료일', example: '2021-12-31' })
  @IsString()
  @IsNotEmpty()
  endDate: string;
} 