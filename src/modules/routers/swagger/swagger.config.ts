import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API description')
  .setVersion('1.0')
  .addBasicAuth(
    {
      type: 'http',
      scheme: 'basic',
      description: 'Enter your username and password.',
    },
    'basic-auth',
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    authAction: {
      'basic-auth': {
        name: 'basic-auth',
        schema: {
          type: 'http',
          scheme: 'basic',
        },
        value: {
          username: process.env.SWAGGER_USER,
          password: process.env.SWAGGER_PASSWORD,
        },
      },
    },
  },
};

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  ignoreGlobalPrefix: false,
};
