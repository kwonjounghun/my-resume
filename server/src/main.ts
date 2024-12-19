import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { MongooseExceptionFilter } from './common/filters/mongoose-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  
  // CORS 설정
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  // API 접두사 설정
  app.setGlobalPrefix('api');

  // 전역 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 전역 인터셉터 설정
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 쿠키 파서 미들웨어 추가
  app.use(cookieParser());

  // 전역 예외 필터 설정
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new MongooseExceptionFilter(),
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('My Resume API')
    .setDescription('The My Resume API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // MongoDB 연결 로깅
  console.log('MongoDB URI:', process.env.MONGODB_URI);

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap(); 