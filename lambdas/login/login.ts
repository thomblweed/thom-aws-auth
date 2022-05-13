import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2
} from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  const { body } = event;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'No body found'
      })
    };
  }

  const { username, password } = JSON.parse(body);

  return {
    statusCode: 200,
    body: JSON.stringify({ username, password, token: '12345hello' }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
