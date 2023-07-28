import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersShema } from '../../models/users.model';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: usersShema }])],
  providers: [UserService, ConfigService],
  controllers: [UserController],
})
export class UserModule {}
