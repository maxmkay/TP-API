import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import * as AWS from "aws-sdk"

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {

  constructor(private readonly configService: ConfigService) {}

  //You can retrun promise as well
  public async createMongooseOptions(): Promise<MongooseModuleOptions> {
    AWS.config.region = process.env.AWS_REGION; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.IDENTITY_POOL,
    });
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: 'getParameter' /* required */,
    };

    const getParameter = await new Promise((resolve, reject) => {
      lambda.invoke(params, function (err, data) {
        if (err) reject('Error');
        else resolve(data);
      });
    });

    //@ts-ignore
    const paramters = JSON.parse(JSON.parse(getParameter.Payload).body);

    return {
      uri: paramters.database_url,
    };
  }
}