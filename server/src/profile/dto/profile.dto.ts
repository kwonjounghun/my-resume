import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsBoolean, Min, Max, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class LinkDto {
  @IsString()
  type: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class EducationDto {
  @IsString()
  schoolName: string;

  @IsString()
  major: string;

  @IsString()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isAttending?: boolean;
}

export class SkillDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  level: number;
}

export class AwardDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CertificationDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  score?: string;

  @IsString()
  @IsOptional()
  date?: string;
}

export class LanguageDto {
  @IsString()
  name: string;

  @IsEnum(['상', '중', '하'])
  level: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  @IsOptional()
  certifications?: CertificationDto[];
}

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills?: SkillDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AwardDto)
  awards?: AwardDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  links?: LinkDto[];
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills?: SkillDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AwardDto)
  awards?: AwardDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  links?: LinkDto[];
} 