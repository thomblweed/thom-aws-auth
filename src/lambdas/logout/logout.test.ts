import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { expect, test, vi } from 'vitest';

import { handler } from './logout';

test('should return correct response', async () => {
  const event: APIGatewayProxyEventV2 = {
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
  const context: Context = {
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

  expect(await handler(event, context)).toEqual({
    statusCode: 200,
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    cookies: ['thom-auth=null; Expires=Thu, 01 Jan 1970 00:00:00 GMT']
  });
});
