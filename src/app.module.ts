import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AppConfig } from './api/config/config.module';
import { StripeModule } from './api/stripe/stripe..module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@topprop.bbyd3va.mongodb.net/TopProp`,
    ),
    UserModule,
    AppConfig,
    StripeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
