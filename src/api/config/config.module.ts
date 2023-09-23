import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersShema } from '../../models/users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: usersShema }])],
  providers: [ConfigService],
  controllers: [ConfigController],
  exports: [ConfigService],
})
export class AppConfig {}
