import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WorkExperienceDocument extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const WorkExperienceSchema = SchemaFactory.createForClass(WorkExperienceDocument); 