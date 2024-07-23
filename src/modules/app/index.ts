import { AppBootstrap } from './setup';

async function bootstrap() {
  const appBootstrap = new AppBootstrap();
  await appBootstrap.init();
}

bootstrap();
