import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ description: 'The name of the tenant' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The email of the tenant' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class TenantInterfaceResponse {
  @ApiProperty({
    description: 'The name of the tenant',
    example: 'Tenant Name',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the tenant',
    example: 'tenant@example.com',
  })
  email: string;

  // Add other properties as needed
}
