import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TenantInterface } from './tenant.interface';

@Schema()
export class Tenant extends Document implements TenantInterface {
  @Prop({ type: String, required: true })
  name: TenantInterface['name'];

  @Prop({ type: String, required: true })
  email: TenantInterface['email'];

  @Prop({ type: Date, required: true, default: Date.now })
  createdAt: TenantInterface['createdAt'];
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
