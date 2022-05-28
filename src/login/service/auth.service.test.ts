import { vi, describe, beforeEach, it, expect, SpyInstance } from 'vitest';
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from 'amazon-cognito-identity-js';

import { login } from './auth.service';

describe('When authenticateUser is successful', () => {
  let response: string;
  beforeEach(async () => {
    CognitoIdentity.CognitoUser.prototype.authenticateUser = vi.fn(
      (authDetails, callbacks) => {
        const sessionData = {
          IdToken: new CognitoIdToken({
            IdToken: 'idToken'
          }),
          AccessToken: new CognitoAccessToken({
            AccessToken: 'accessToken'
          }),
          RefreshToken: new CognitoRefreshToken({
            RefreshToken: 'refreshToken'
          })
        };
        const cachedSession = new CognitoUserSession(sessionData);
        callbacks.onSuccess(cachedSession);
      }
    );
    response = await login('username', 'password');
  });

  it('should return access token', () => {
    expect(response).toBe('accessToken');
  });
});
