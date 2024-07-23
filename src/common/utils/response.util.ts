import { ApiProperty } from '@nestjs/swagger';

export enum ResponseTypeEnum {
  SUCCESS = 'success',
  FAILED = 'failed',
}
export class SuccessResponseModel<T> {
  @ApiProperty({
    description: 'Response status',
    example: ResponseTypeEnum.SUCCESS,
  })
  status?: ResponseTypeEnum;

  @ApiProperty({ description: 'Response data' })
  data: T;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation successful',
  })
  message?: string;

  @ApiProperty({
    description: 'Additional metadata',
    type: Object,
    additionalProperties: true,
    required: false,
  })
  meta?: object;

  constructor(
    data: T,
    message?: string,
    status: ResponseTypeEnum = ResponseTypeEnum.SUCCESS,
    meta?: object,
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.meta = meta;
  }
}

export function success<T>(data: T, message: string): SuccessResponseModel<T> {
  return new SuccessResponseModel(data, message);
}
