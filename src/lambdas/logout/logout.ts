import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler
} from 'aws-lambda';
import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';

const logout: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
> = async (): Promise<APIGatewayProxyStructuredResultV2> => {
  return {
    statusCode: 200,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      Cookie: ''
    }
  };
};

export const handler = middy(logout);

handler.use(httpHeaderNormalizer());
