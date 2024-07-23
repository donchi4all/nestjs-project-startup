import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateTenantDto } from './create-tenant.dto';

export class UpdateTenantDto extends PartialType(CreateTenantDto) {
  @ApiProperty({ description: 'The name of the tenant', required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ description: 'The email of the tenant', required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
