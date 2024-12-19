import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';

@Catch(MongoError, MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError | MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error occurred';

    // MongoDB 에러 처리
    if (exception instanceof MongoError) {
      switch (exception.code) {
        case 11000:
          status = HttpStatus.CONFLICT;
          message = 'Duplicate key error';
          break;
        default:
          message = `MongoDB error: ${exception.message}`;
      }
    }

    // Mongoose 유효성 검사 에러 처리
    if (exception instanceof MongooseError.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      const errors = Object.values(exception.errors).map(err => err.message);
      message = errors.join(', ');
    }

    // Mongoose CastError (잘못된 ObjectId 등) 처리
    if (exception instanceof MongooseError.CastError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Invalid ${exception.kind}: ${exception.value}`;
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: message,
      stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
    };

    // 콘솔에 에러 로깅
    console.error('Mongoose Exception occurred:', {
      ...errorResponse,
      stack: exception.stack,
    });

    response.status(status).json(errorResponse);
  }
} 