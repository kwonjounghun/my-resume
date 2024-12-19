import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ResumeDocument = Resume & Document;

@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ required: true })
  selfIntroductionId: string;

  @Prop([String])
  projects: string[];

  @Prop([String])
  companyWishlist: string[];

  @Prop({ default: false })
  isPublic: boolean;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume); 