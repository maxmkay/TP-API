import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersShema } from '../../models/users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: usersShema }])],
  providers: [StripeService, ConfigService, UserService],
  controllers: [StripeController],
})
export class StripeModule {}
