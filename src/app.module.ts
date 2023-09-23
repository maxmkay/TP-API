import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AppConfig } from './api/config/config.module';
import { StripeModule } from './api/stripe/stripe..module';
import { MongodbConfigService } from './mongodb.config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [AppConfig],
      useClass: MongodbConfigService,
    }),
    UserModule,
    AppConfig,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
