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
    try {
      const appConfig = await this.configService.getConfig();
      return {
        uri: appConfig.mongoUrl,
      };
    } catch (e) {
      console.log('mongodberror', e);
      return e;
    }
  }
}
