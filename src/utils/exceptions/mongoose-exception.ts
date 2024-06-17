import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

@Catch(MongoError, Error.CastError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof MongoError) {
      console.log(exception.code, exception);

      // Handle MongoDB specific errors (e.g., unique constraint errors)
      switch (exception.code) {
        case 11000:
          response.status(HttpStatus.CONFLICT).json({
            statusCode: HttpStatus.CONFLICT,
            message: 'Duplicate key error: The resource already exists.',
            error: 'Conflict',
          });
      }
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred.',
        error: 'Internal Server Error',
      });
    }
  }
}
