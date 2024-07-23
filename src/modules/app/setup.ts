import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import * as basicAuth from 'express-basic-auth';
import * as dotenv from 'dotenv';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  swaggerConfig,
  swaggerCustomOptions,
  swaggerDocumentOptions,
} from '../routers/swagger/swagger.config';
import {
  LoggerDecorator,
  LoggerInterface,
} from './../../common/logger/decorators/logger.decorator';

dotenv.config();

export class AppBootstrap {
  @LoggerDecorator('Controller.Server')
  private logger: LoggerInterface;

  private app: INestApplication;
  private readonly SWAGGER_USER: string;
  private readonly SWAGGER_PASSWORD: string;

  constructor() {
    this.SWAGGER_USER = process.env.SWAGGER_USER;
    this.SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD;
  }

  async init(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
    this.setGlobalPrefix();
    this.setupBasicAuth();
    this.setupSwagger();
    await this.startServer();
  }

  private setGlobalPrefix(): void {
    this.app.setGlobalPrefix('api');
  }

  private setupBasicAuth(): void {
    this.app.use(
      ['/api/docs', '/api-json'],
      basicAuth({
        users: { [this.SWAGGER_USER]: this.SWAGGER_PASSWORD },
        challenge: true,
      }),
    );
  }

  private setupSwagger(): void {
    const document = SwaggerModule.createDocument(
      this.app,
      swaggerConfig,
      swaggerDocumentOptions,
    );
    SwaggerModule.setup('api/docs', this.app, document, swaggerCustomOptions);
  }

  private async startServer(): Promise<void> {
    await this.app.listen(3000);
    this.logger.info(`Application is running on: ${await this.app.getUrl()}`);
  }
}
