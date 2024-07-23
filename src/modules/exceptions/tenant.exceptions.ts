import { HttpException, HttpStatus } from '@nestjs/common';

export class TenantExceptions {
  static notFound(error?: string): HttpException {
    return new HttpException(
      {
        name: 'TenantNotFoundError',
        code: 'TENANT_NOT_FOUND',
        message: error || 'Tenant not found.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  static creationError(error?: string): HttpException {
    return new HttpException(
      {
        name: 'TenantCreationError',
        code: 'TENANT_CREATION_ERROR',
        message: error || 'Error occurred while creating the tenant.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static updateError(error?: string): HttpException {
    return new HttpException(
      {
        name: 'TenantUpdateError',
        code: 'TENANT_UPDATE_ERROR',
        message: error || 'Error occurred while updating the tenant.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static validationError(error?: string): HttpException {
    return new HttpException(
      {
        name: 'TenantValidationError',
        code: 'TENANT_VALIDATION_ERROR',
        message: error || 'Tenant validation failed.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static duplicateError(error?: string): HttpException {
    return new HttpException(
      {
        name: 'TenantDuplicateError',
        code: 'TENANT_DUPLICATE_ERROR',
        message: error || 'Duplicate tenant found.',
      },
      HttpStatus.CONFLICT,
    );
  }
}
