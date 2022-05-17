import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
} from 'aws-lambda';
import middy from '@middy/core';
import validator from '@middy/validator';

const login = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { body } = event;

  // if (!body) {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({
  //       error: 'No body found'
  //     })
  //   };
  // }

  const { username } = JSON.parse(body!);

  return {
    statusCode: 200,
    body: JSON.stringify({ username, token: '12345hello' }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export const handler = middy(login);

handler.use(
  validator({
    inputSchema: {
      type: 'object',
      required: ['body'],
      properties: {
        // this will pass validation
        body: {
          type: 'string'
        }
      }
    }
  })
);
