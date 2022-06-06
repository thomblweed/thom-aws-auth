import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler
} from 'aws-lambda';
import middy from '@middy/core';
import validator from '@middy/validator';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

import { loginValidationSchema } from './schema/validation.schema';
import { Credentials } from './types';
import { authenticate } from './service/cognito.service';

const login: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
> = async (event): Promise<APIGatewayProxyStructuredResultV2> => {
  const { body } = event;
  const { username, password } = body as unknown as Credentials;

  try {
    const jwtToken = await authenticate(username, password);
    return {
      statusCode: 200,
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        Cookie: `jwtToken=${jwtToken}`
      }
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export const handler = middy(login);

handler
  .use(httpJsonBodyParser())
  .use(validator(loginValidationSchema))
  .use(httpHeaderNormalizer());
