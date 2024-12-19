import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RetrospectiveDocument = Retrospective & Document;

@Schema({ timestamps: true })
export class Retrospective {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  situation: string;

  @Prop()
  task: string;

  @Prop()
  action: string;

  @Prop()
  result: string;

  @Prop()
  summary: string;

  @Prop([String])
  keywords: string[];

  @Prop()
  company: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  isPublic: boolean;
}

export const RetrospectiveSchema = SchemaFactory.createForClass(Retrospective); 