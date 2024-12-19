import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIntroductionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
} 