import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

export enum CompanyStatus {
  DOCUMENT_SUBMITTED = 'DOCUMENT_SUBMITTED',
  DOCUMENT_PASSED = 'DOCUMENT_PASSED',
  DOCUMENT_FAILED = 'DOCUMENT_FAILED',
  ASSIGNMENT_PASSED = 'ASSIGNMENT_PASSED',
  FIRST_INTERVIEW = 'FIRST_INTERVIEW',
  SECOND_INTERVIEW = 'SECOND_INTERVIEW',
  FINAL_PASSED = 'FINAL_PASSED',
  FINAL_FAILED = 'FINAL_FAILED',
}

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  link: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  resumeId: string;

  @Prop({ default: false })
  isJobApplied: boolean;

  @Prop({ type: String, enum: CompanyStatus, default: CompanyStatus.DOCUMENT_SUBMITTED })
  status: CompanyStatus;
}

export const CompanySchema = SchemaFactory.createForClass(Company); 