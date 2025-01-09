import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Education {
  @Prop({ required: true })
  schoolName: string;

  @Prop({ required: true })
  major: string;

  @Prop({ required: true })
  startDate: string;

  @Prop()
  endDate?: string;

  @Prop({ required: true })
  isAttending: boolean;
}

class Skill {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: number;
}

class Award {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  description: string;
}

class Language {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: string;

  @Prop({ type: [String], default: [] })
  certifications: string[];
}

class Link {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  url: string;
}

@Schema()
export class Profile {
  @Prop({ required: true })
  userId: string;

  // 필수 필드
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  // 선택적 필드
  @Prop({ type: [Education], default: [] })
  education?: Education[];

  @Prop({ type: [Skill], default: [] })
  skills?: Skill[];

  @Prop({ type: [Award], default: [] })
  awards?: Award[];

  @Prop({ type: [Language], default: [] })
  languages?: Language[];

  @Prop({ type: [Link], default: [] })
  links?: Link[];
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile); 