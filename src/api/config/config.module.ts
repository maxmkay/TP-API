import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersShema } from '../../models/users.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: usersShema }])],
  providers: [
    ConfigService,
    {
      provide: 'ASYNC_CONFIG',
      useFactory: async (configService: ConfigService) => {
        await configService.getConfig();
        return configService.getConfig();
      },
      inject: [ConfigService],
    },
  ],
  controllers: [ConfigController],
  exports: [ConfigService, 'ASYNC_CONFIG'], // Export ConfigService
})
export class AppConfig {}
