import { LoggerMiddleware } from './../../middlewares/logger/logger.middleware';
import { AllExceptionsFilter } from './../../common/filters/all-exceptions.filter';
import { winstonConfig } from '../../common/logger/logger';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppService } from '../../app.service';
import { TenantService } from '../../api/services/tenant/tenant.service';
import { TenantController } from '../../api/controllers/tenant/tenant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from '../../api/models/tenant/tenant.module';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env file
    MongooseModule.forRoot(process.env.MONGODB_URI),
    WinstonModule.forRoot(winstonConfig), // Configure Winston logging
    TenantModule, // Import the TenantModule
  ],
  controllers: [TenantController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter, // Register global exception filter
    },
    AppService,
    TenantService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Apply request logging middleware
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
