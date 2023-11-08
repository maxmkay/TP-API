import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './api/config/config.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      if (reason instanceof Error) {
        console.error(reason.stack);
      }
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      console.error(error.stack);
      process.exit(1);
    });
    await app.listen(3000);
  } catch (e) {
    console.log('this is erro', e);
  }
}
bootstrap();
