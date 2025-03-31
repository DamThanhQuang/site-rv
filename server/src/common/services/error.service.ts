import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  code?: string;
  details?: any;
}

@Injectable()
export class ErrorService {
  // Client errors
  notFound(resource: string, id?: string): HttpException {
    const message = id
      ? `${resource} with ID ${id} was not found`
      : `No ${resource} found`;

    return new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message,
        error: 'Not Found',
        code: `${resource.toUpperCase()}_NOT_FOUND`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  badRequest(message: string, code: string): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Bad Request',
        code,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  // Server errors
  serverError(message: string, details?: any): HttpException {
    // Log the full error details for debugging
    console.error('Server error:', details);

    // Return sanitized error to the user
    return new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred. Please try again later.',
        error: 'Internal Server Error',
        code: 'SERVER_ERROR',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // Validation errors
  validationError(message: string, details?: any): HttpException {
    return new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
        error: 'Validation Error',
        code: 'VALIDATION_ERROR',
        details,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
