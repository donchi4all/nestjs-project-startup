import { TenantExceptions } from './../../../modules/exceptions/tenant.exceptions';
import { CreateTenantDto } from './../../services/tenant/dtos/create-tenant.dto';
import { TenantInterface } from '../../models/tenant/tenant.interface';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TenantService } from './../../services/tenant/tenant.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateTenantDto } from './../../services/tenant/dtos/update-tenant.dto';
import {
  success,
  SuccessResponseModel,
} from '../../../common/utils/response.util';
import {
  LoggerDecorator,
  LoggerInterface,
} from '../../../common/logger/decorators/logger.decorator';

@ApiTags('Tenants')
@Controller({
  version: '1',
  path: '/tenants',
})
export class TenantController {
  @LoggerDecorator('Controller.Tenant')
  private logger: LoggerInterface;

  constructor(private readonly tenantService: TenantService) {}

  @ApiCreatedResponse({
    description: 'Tenant created successfully.',
    type: SuccessResponseModel<TenantInterface>,
  })
  @ApiBody({ type: CreateTenantDto })
  @ApiOperation({ summary: 'Create a new tenant' })
  @Post()
  async create(
    @Body() createTenantDto: CreateTenantDto,
  ): Promise<SuccessResponseModel<TenantInterface>> {
    try {
      const existingTenant = await this.tenantService.findByName(
        createTenantDto.name,
      );

      if (existingTenant) {
        // Throw custom exception if tenant already exists
        throw TenantExceptions.duplicateError();
      }

      // Validate input if necessary
      const tenant = await this.tenantService.create(createTenantDto);
      return success<TenantInterface>(tenant, 'Tenant created successfully');
    } catch (error) {
      this.logger.error(`Route /tenants post with err: ${error.message}`);
      // Handle specific creation errors or general internal errors
      if (error.code === 'duplicate_key') {
        throw TenantExceptions.duplicateError(error.message);
      }
      throw TenantExceptions.creationError(error.message);
    }
  }

  @ApiCreatedResponse({
    description: 'Tenant found successfully.',
    type: SuccessResponseModel<TenantInterface>,
  })
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a tenant by ID' })
  @ApiParam({ name: 'id', description: 'ID of the tenant' })
  async findOne(
    @Param('id') id: string,
  ): Promise<SuccessResponseModel<TenantInterface>> {
    try {
      const tenant = await this.tenantService.findOne(id);
      if (!tenant) {
        throw TenantExceptions.notFound();
      }
      return success<TenantInterface>(tenant, 'Tenant found successfully');
    } catch (error) {
      this.logger.error(`Route /tenants/${id} get with err: ${error.message}`);
      // Handle specific not found errors or other errors
      if (error.message.includes('Cast to ObjectId failed')) {
        throw TenantExceptions.notFound(
          'Tenant with the provided ID does not exist.',
        );
      }
      throw TenantExceptions.notFound(error.message);
    }
  }

  @ApiCreatedResponse({
    description: 'Tenant list successfully.',
    type: SuccessResponseModel<TenantInterface>,
  })
  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all tenants' })
  async findAll(): Promise<SuccessResponseModel<TenantInterface[]>> {
    const tenants = await this.tenantService.findAll();
    return success<TenantInterface[]>(tenants, 'Tenant list successfully');
  }

  @ApiResponse({
    status: 200,
    description: 'Tenant updated successfully',
    type: SuccessResponseModel,
  })
  @ApiOperation({ summary: 'Update a tenant by ID' })
  @ApiBody({ type: UpdateTenantDto })
  @ApiParam({ name: 'id', description: 'ID of the tenant' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<SuccessResponseModel<TenantInterface>> {
    try {
      const tenant = await this.tenantService.update(id, updateTenantDto);
      if (!tenant) {
        throw TenantExceptions.notFound();
      }
      return success<TenantInterface>(tenant, 'Tenant updated successfully');
    } catch (error) {
      this.logger.error(
        `Route /tenants/${id}  with body ${updateTenantDto} patch with err: ${error.message}`,
      );
      // Handle specific update errors or general internal errors
      if (error.message.includes('validation failed')) {
        throw TenantExceptions.validationError();
      }
      throw TenantExceptions.updateError(error.message);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Tenant deleted successfully',
    type: SuccessResponseModel,
  })
  @ApiOperation({ summary: 'Delete a tenant by ID' })
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the tenant' })
  async remove(@Param('id') id: string): Promise<SuccessResponseModel<null>> {
    try {
      const result = await this.tenantService.remove(id);
      if (!result) {
        throw TenantExceptions.notFound();
      }
      return success<null>(null, 'Tenant deleted successfully');
    } catch (error) {
      this.logger.error(
        `Route /tenants/${id} delete with err: ${error.message}`,
      );
      // Handle specific deletion errors or general internal errors
      if (error.message.includes('not found')) {
        throw TenantExceptions.notFound(
          'Tenant with the provided ID does not exist.',
        );
      }
      throw TenantExceptions.updateError(error.message);
    }
  }
}
