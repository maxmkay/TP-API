import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from './api/config/config.service';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  public async createMongooseOptions(): Promise<MongooseModuleOptions> {
    const appConfig = await this.configService.getConfig();
    return {
      uri: appConfig.mongoUrl,
    };
  }
}
