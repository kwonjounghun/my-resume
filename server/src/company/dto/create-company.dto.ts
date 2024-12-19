import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { CompanyStatus } from '../schemas/company.schema';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  resumeId: string;

  @IsOptional()
  @IsBoolean()
  isJobApplied?: boolean;

  @IsOptional()
  @IsEnum(CompanyStatus)
  status?: CompanyStatus;
} 