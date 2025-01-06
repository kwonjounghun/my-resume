import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { IntroductionModule } from './introduction/introduction.module';
import { RetrospectiveModule } from './retrospective/retrospective.module';
import { ResumeModule } from './resume/resume.module';
import { CompanyModule } from './company/company.module';
import { OpenAIService } from './common/services/openai.service';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    IntroductionModule,
    RetrospectiveModule,
    ResumeModule,
    CompanyModule,
    ProfileModule,
    ProjectModule,
  ],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class AppModule { } 