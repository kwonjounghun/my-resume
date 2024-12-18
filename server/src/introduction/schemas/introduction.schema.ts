import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IntroductionDocument = Introduction & Document;

@Schema({ timestamps: true })
export class Introduction {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: string;
}

export const IntroductionSchema = SchemaFactory.createForClass(Introduction); 