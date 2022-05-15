import { beforeAll, describe, expect, it } from 'vitest';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
} from 'aws-lambda';

import { handler } from './login';

const baseEvent = {
  version: '',
  routeKey: '',
  rawPath: '',
  rawQueryString: '',
  headers: {},
  requestContext: {} as any,
  isBase64Encoded: false
};

describe('When a body is provided in the event', () => {
  let response: APIGatewayProxyStructuredResultV2;
  beforeAll(async () => {
    const event: APIGatewayProxyEventV2 = {
      body: JSON.stringify({
        username: 'test',
        password: 'test'
      }),
      ...baseEvent
    };
    response = await handler(event);
  });

  it('should return 200 statusCode', () => {
    expect(response.statusCode).toBe(200);
  });

  it('should return correct body', async () => {
    expect(response.body).toEqual(
      JSON.stringify({ username: 'test', token: '12345hello' })
    );
  });
});

describe('When body is omitted from the event', () => {
  let response: APIGatewayProxyStructuredResultV2;
  beforeAll(async () => {
    const event: APIGatewayProxyEventV2 = {
      ...baseEvent
    };
    response = await handler(event);
  });

  it('should return 400 statusCode', () => {
    expect(response.statusCode).toBe(400);
  });

  it('should return correct body', async () => {
    expect(response.body).toEqual(JSON.stringify({ error: 'No body found' }));
  });
});
