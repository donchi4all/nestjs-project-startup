import { TenantService } from './../../services/tenant/tenant.service';
import { TenantController } from './../../controllers/tenant/tenant.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './tenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }]),
  ],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService, MongooseModule], // Export MongooseModule to make TenantModel available in other modules
})
export class TenantModule {}
