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
  headers: {
    'Content-Type': 'application/json'
  },
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
        username: 'test@testing.com',
        password: 'password-test'
      }),
      ...baseEvent
    };
    response = await handler(event, baseContext);
  });

  it('should return 200 statusCode', () => {
    expect(response.statusCode).toBe(200);
  });

  it('should return correct body value as json', async () => {
    expect(response.body).toEqual(
      JSON.stringify({ username: 'test@testing.com', token: '12345hello' })
    );
  });
});

describe('When body is omitted from the event', () => {
  const event: APIGatewayProxyEventV2 = {
    ...baseEvent
  };

  it('should throw a validation error', async () => {
    await expect(handler(event, baseContext)).rejects.toThrowError(
      'Invalid or malformed JSON was provided'
    );
  });
});

describe('When username is omitted from the body', () => {
  const event: APIGatewayProxyEventV2 = {
    body: JSON.stringify({
      password: 'password-test'
    }),
    ...baseEvent
  };

  it('should throw an object failed error', async () => {
    await expect(handler(event, baseContext)).rejects.toThrowError(
      'Event object failed validation'
    );
  });
});

describe('When password is omitted from the body', () => {
  const event: APIGatewayProxyEventV2 = {
    body: JSON.stringify({
      username: 'test@testing.com'
    }),
    ...baseEvent
  };

  it('should throw an object failed error', async () => {
    await expect(handler(event, baseContext)).rejects.toThrowError(
      'Event object failed validation'
    );
  });
});
