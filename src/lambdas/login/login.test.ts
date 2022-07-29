import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Context
} from 'aws-lambda';

import * as CognitoService from './service/cognito.service';
import { handler } from './login';

const spyAuthenticate = vi.spyOn(CognitoService, 'authenticate');

const baseEvent: APIGatewayProxyEventV2 = {
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
  let event: APIGatewayProxyEventV2;
  beforeEach(async () => {
    event = {
      body: JSON.stringify({
        email: 'test@testing.com',
        password: 'password-test'
      }),
      ...baseEvent
    };
  });

  describe('And the authentication is successful', () => {
    let response: APIGatewayProxyStructuredResultV2;
    beforeEach(async () => {
      spyAuthenticate.mockResolvedValue('jwtTokenValue');
      response = await handler(event, baseContext);
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return 200 statusCode', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should return correct body value as json', async () => {
      expect(response.body).toEqual(
        JSON.stringify({ email: 'test@testing.com' })
      );
    });

    it('should return jwt cookie', () => {
      expect(response.cookies).toEqual([
        'thom-auth=jwtTokenValue; Secure; HttpOnly'
      ]);
    });
  });

  describe('And the authentication fails', () => {
    let response: APIGatewayProxyStructuredResultV2;
    beforeEach(async () => {
      spyAuthenticate.mockRejectedValue('error happened');
      response = await handler(event, baseContext);
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return 401 statusCode', () => {
      expect(response.statusCode).toBe(401);
    });
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
