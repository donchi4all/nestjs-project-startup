import { TenantInterface } from '../../models/tenant/tenant.interface';
import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dtos/create-tenant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTenantDto } from './dtos/update-tenant.dto';
import { Tenant } from './../../models/tenant/tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantInterface>,
  ) {}

  getHello(): string {
    return 'Hello World! testing tenant!';
  }
  async create(createTenantDto: CreateTenantDto): Promise<TenantInterface> {
    const createdTenant = new this.tenantModel(createTenantDto);
    return createdTenant.save();
  }

  async findByName(name: string): Promise<TenantInterface> {
    // Find tenant by name
    return await this.tenantModel.findOne({ name }).exec();
  }

  async findAll(): Promise<TenantInterface[]> {
    return this.tenantModel.find().exec();
  }

  async findOne(id: string): Promise<TenantInterface> {
    return this.tenantModel.findById(id).exec();
  }

  async update(
    id: string,
    updateTenantDto: UpdateTenantDto,
  ): Promise<TenantInterface> {
    return this.tenantModel
      .findByIdAndUpdate(id, updateTenantDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<TenantInterface> {
    return this.tenantModel.findByIdAndDelete(id).exec();
  }
}
