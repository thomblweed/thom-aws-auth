import { CognitoIdentityServiceProvider } from 'aws-sdk';
import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

export const loginHandler: APIGatewayProxyHandler = async (
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

  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: 'client_id',
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    },
    UserPoolId: 'user_pool_id'
  };
  const cognito = new CognitoIdentityServiceProvider();
  const response = await cognito.adminInitiateAuth(params).promise();

  if (!response.AuthenticationResult) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Invalid username or password'
      })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ token: response.AuthenticationResult.IdToken }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
