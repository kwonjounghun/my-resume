import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsString()
  selfIntroductionId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  companyWishlist?: string[];

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
} 