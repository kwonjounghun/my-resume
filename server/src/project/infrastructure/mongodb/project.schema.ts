import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProjectDocument extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  workExperienceId: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop()
  situation?: string;

  @Prop()
  task?: string;

  @Prop()
  action?: string;

  @Prop()
  result?: string;

  @Prop()
  summary?: string;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({ default: false })
  isPublic: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDocument); 