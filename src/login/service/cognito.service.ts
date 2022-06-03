import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

const userPool: CognitoUserPool = new CognitoUserPool({
  UserPoolId: process.env.USER_POOL_ID!,
  ClientId: process.env.CLIENT_ID!
});

export const authenticate = (
  username: string,
  password: string
): Promise<string> => {
  console.log('process.env.USER_POOL_ID', process.env.USER_POOL_ID);
  console.log('process.env.CLIENT_ID', process.env.CLIENT_ID);
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool
  });
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession) => {
        resolve(session.getAccessToken().getJwtToken());
      },
      onFailure: (error: any) => {
        reject(error);
      }
    });
  });
};
