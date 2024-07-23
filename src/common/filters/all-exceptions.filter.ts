import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = this.formatErrorResponse(exception);

    this.logger.error(`Error ${status} ${request.method} ${request.url}`, {
      status,
      message: (exception as any).message,
      stack: (exception as any).stack,
    });

    response.status(status).json(errorResponse);
  }

  private formatErrorResponse(exception: unknown) {
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        const {
          name = 'HttpException',
          code = 'HTTP_ERROR',
          message = 'An error occurred.',
        } = exceptionResponse as any;
        return { name, code, message };
      }
    }

    // Fallback for non-HttpExceptions or generic errors
    return {
      name: 'UnknownError',
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred.',
    };
  }
}
