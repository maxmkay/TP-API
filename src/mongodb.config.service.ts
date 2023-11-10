import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from './api/config/config.service';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(@Inject('ASYNC_CONFIG') private appConfig) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.appConfig.mongoUrl,
    };
  }
}
