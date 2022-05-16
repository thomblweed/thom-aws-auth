import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
} from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { body } = event;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'No body found'
      })
    };
  }

  const { username } = JSON.parse(body);

  return {
    statusCode: 200,
    body: JSON.stringify({ username, token: '12345hello' }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
