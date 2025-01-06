import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProjectDocument extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  situation?: string;

  @Prop()
  task?: string;

  @Prop()
  action?: string;

  @Prop()
  result?: string;

  @Prop({ required: true })
  isPublic: boolean;

  @Prop([String])
  keywords?: string[];

  @Prop()
  summary?: string;

  @Prop({ required: true })
  workExperienceId: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDocument); 