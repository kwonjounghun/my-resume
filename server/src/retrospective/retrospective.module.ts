import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RetrospectiveController } from './retrospective.controller';
import { RetrospectiveService } from './retrospective.service';
import { Retrospective, RetrospectiveSchema } from './schemas/retrospective.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Retrospective.name, schema: RetrospectiveSchema },
    ]),
  ],
  controllers: [RetrospectiveController],
  providers: [RetrospectiveService],
})
export class RetrospectiveModule {} 