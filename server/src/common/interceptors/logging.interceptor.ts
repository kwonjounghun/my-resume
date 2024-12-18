import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, originalUrl, body, query, params } = request;
    const startTime = Date.now();

    // 요청 로깅
    this.logger.log(
      `[Request] ${method} ${originalUrl}\n` +
      `Headers: ${JSON.stringify(request.headers)}\n` +
      `Body: ${JSON.stringify(body)}\n` +
      `Query: ${JSON.stringify(query)}\n` +
      `Params: ${JSON.stringify(params)}`,
    );

    return next.handle().pipe(
      tap({
        next: (data: any) => {
          const endTime = Date.now();
          const duration = endTime - startTime;

          // 응답 로깅
          this.logger.log(
            `[Response] ${method} ${originalUrl} ${response.statusCode} ${duration}ms\n` +
            `Response Body: ${JSON.stringify(data)}`,
          );
        },
        error: (error: any) => {
          const endTime = Date.now();
          const duration = endTime - startTime;

          // 에러 로깅
          this.logger.error(
            `[Error] ${method} ${originalUrl} ${error.status || 500} ${duration}ms\n` +
            `Error Message: ${error.message}\n` +
            `Stack Trace: ${error.stack}`,
          );
        },
      }),
    );
  }
} 