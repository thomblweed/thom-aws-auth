import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

const userPool: CognitoUserPool = new CognitoUserPool({
  UserPoolId: 'iqq48NugLtbvFn2bYs-uns_kvQOK4Zm1aWPKsT9',
  ClientId: 'dasdasds'
});

export const authenticate = (
  username: string,
  password: string
): Promise<string> => {
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
      onSuccess: (session: CognitoUserSession) =>
        resolve(session.getAccessToken().getJwtToken()),
      onFailure: (error: any) => reject(error)
    });
  });
};
