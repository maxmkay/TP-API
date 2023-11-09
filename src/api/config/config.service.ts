import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class ConfigService {
  async getConfig() {
    AWS.config.region = process.env.AWS_REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.IDENTITY_POOL,
    });
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: 'getParameter',
      Payload: JSON.stringify({
        env: process.env.ENVIRONMENT,
      }),
    };

    const getParameter = await new Promise((resolve, reject) => {
      lambda.invoke(params, function (err, data) {
        if (err) reject('Error');
        else resolve(data);
      });
    });

    //@ts-ignore
    const parametersJSON = JSON.parse(getParameter.Payload).body;

    return JSON.parse(parametersJSON);
  }
}
