import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IntroductionController } from './introduction.controller';
import { IntroductionService } from './introduction.service';
import { Introduction, IntroductionSchema } from './schemas/introduction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Introduction.name, schema: IntroductionSchema },
    ]),
  ],
  controllers: [IntroductionController],
  providers: [IntroductionService],
})
export class IntroductionModule {}
