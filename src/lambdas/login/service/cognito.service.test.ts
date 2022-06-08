import {
  vi,
  describe,
  beforeEach,
  it,
  expect,
  beforeAll,
  afterAll
} from 'vitest';
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from 'amazon-cognito-identity-js';

import { authenticate } from './cognito.service';

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
        return callbacks.onSuccess(cachedSession);
      }
    );
    response = await authenticate('username', 'password');
  });

  it('should return access token', () => {
    expect(response).toBe('accessToken');
  });
});

describe('When authenticateUser fails', () => {
  beforeEach(async () => {
    CognitoIdentity.CognitoUser.prototype.authenticateUser = vi.fn(
      (authDetails, callbacks) => {
        return callbacks.onFailure(new Error('things happened'));
      }
    );
  });

  it('should throw an error', async () => {
    await expect(authenticate('username', 'password')).rejects.toThrowError(
      'things happened'
    );
  });
});
