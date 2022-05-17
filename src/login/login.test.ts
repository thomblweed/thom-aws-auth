import { beforeAll, describe, expect, it, vi } from 'vitest';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Context
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

const baseContext: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  getRemainingTimeInMillis: vi.fn(),
  done: vi.fn(),
  fail: vi.fn(),
  succeed: () => vi.fn()
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
    response = await handler(event, baseContext);
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
  const event: APIGatewayProxyEventV2 = {
    ...baseEvent
  };

  it('should throw a validation error', async () => {
    await expect(handler(event, baseContext)).rejects.toThrowError(
      'Event object failed validation'
    );
  });
});
