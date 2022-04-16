import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'No body found'
      })
    };
  }

  const { username, password } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({ username, password, token: '12345hello' }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
