import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from './api/config/config.service';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  private readonly appConfig: any;

  constructor(private configService: ConfigService) {
    this.appConfig = global['config'];
  }

  public async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: this.appConfig.mongoUrl,
    };
  }
}
