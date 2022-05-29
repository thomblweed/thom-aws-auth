import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import middy from '@middy/core';
import validator from '@middy/validator';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

import { loginValidationSchema } from './schema/validation.schema';
import { Credentials, ProxyHandler } from './types';

const login: ProxyHandler = async (
  event
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { body } = event;
  const { username } = body as unknown as Credentials;

  return {
    statusCode: 200,
    body: JSON.stringify({ username, token: '12345hello' }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export const handler = middy(login);

handler
  .use(validator(loginValidationSchema))
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser());
