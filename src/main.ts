import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './api/config/config.service';

async function bootstrap() {
  const configService = new ConfigService();
  const config = await configService.getConfig();
  global['config'] = config;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  await app.listen(3000);
}
bootstrap();
