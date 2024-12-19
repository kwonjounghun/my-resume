import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: this.getErrorMessage(exception),
      stack: process.env.NODE_ENV === 'development' ? this.getErrorStack(exception) : undefined,
    };

    // 콘솔에 에러 로깅
    console.error('Exception occurred:', {
      ...errorResponse,
      stack: this.getErrorStack(exception),
    });

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        return response;
      }
      if (typeof response === 'object' && 'message' in response) {
        return Array.isArray(response.message)
          ? response.message.join(', ')
          : String(response.message);
      }
      return exception.message;
    }
    if (exception instanceof Error) {
      return exception.message;
    }
    return 'Internal server error';
  }

  private getErrorStack(exception: unknown): string | undefined {
    if (exception instanceof Error) {
      return exception.stack;
    }
    return undefined;
  }
} 