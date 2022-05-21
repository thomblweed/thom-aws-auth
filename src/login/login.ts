import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler
} from 'aws-lambda';
import middy from '@middy/core';
import validator from '@middy/validator';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';

type ProxyHandler = Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
>;

type Credentials = {
  username: string;
  password: string;
};

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
  .use(
    validator({
      inputSchema: {
        type: 'object',
        required: ['body'],
        properties: {
          body: {
            type: 'string'
          }
        }
      }
    })
  )
  .use(httpHeaderNormalizer())
  .use(httpJsonBodyParser());
