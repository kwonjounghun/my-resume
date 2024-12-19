import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RetrospectiveController } from './retrospective.controller';
import { RetrospectiveService } from './retrospective.service';
import { Retrospective, RetrospectiveSchema } from './schemas/retrospective.schema';
import { OpenAIModule } from '../common/services/openai.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Retrospective.name, schema: RetrospectiveSchema },
    ]),
    OpenAIModule,
  ],
  controllers: [RetrospectiveController],
  providers: [RetrospectiveService],
})
export class RetrospectiveModule { } 