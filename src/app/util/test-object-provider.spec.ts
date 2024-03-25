import {RefreshTokenResponse, SignInResponse, SignUpResponse} from "../core/auth/firebase/firebase-api";
import {UserInfo} from "../core/auth/user-info";

export enum TestConstants {
  TEST_EMAIL = "test@test.com",
  TEST_LOCAL_ID = "testLocalId",
  TEST_KIND = "testKind",
  TEST_ID_TOKEN = "testIdToken",
  TEST_REFRESH_TOKEN = "testRefreshToken",
  TEST_EXPIRED_IN = "testExpiredIn",
  TEST_IN_USE = "true",
  TEST_CREATED_AT = "testCreatedAt",
  TEST_PASSWORD = "testPassword",
  TEST_TOKEN_TYPE = "testTokenType",
  TEST_PROJECT_ID = "testProjectId",
  TEST_USER_ID = "testUserId",
  TEST_GRANT_TYPE = "testGrantType",
}

export class TestObjectProvider {
  public static signUpResponse(): SignUpResponse {
    return {
      email: TestConstants.TEST_EMAIL.toString(),
      localId: TestConstants.TEST_LOCAL_ID.toString(),
      idToken: TestConstants.TEST_ID_TOKEN.toString(),
      kind: TestConstants.TEST_KIND.toString(),
      refreshToken: TestConstants.TEST_REFRESH_TOKEN.toString(),
      expiresInSeconds: TestConstants.TEST_EXPIRED_IN.toString()
    }
  }

  public static signInResponse(): SignInResponse {
    return {
      email: TestConstants.TEST_EMAIL.toString(),
      expiresInSeconds: TestConstants.TEST_EXPIRED_IN.toString(),
      idToken: TestConstants.TEST_ID_TOKEN.toString(),
      inUse: Boolean(TestConstants.TEST_IN_USE),
      kind: TestConstants.TEST_KIND.toString(),
      localId: TestConstants.TEST_LOCAL_ID.toString(),
      refreshToken: TestConstants.TEST_REFRESH_TOKEN.toString(),
    }
  }

  public static userInfo(): UserInfo {
    return {
      email: TestConstants.TEST_EMAIL.toString(),
      idToken: TestConstants.TEST_ID_TOKEN.toString(),
      expiresIn: TestConstants.TEST_EXPIRED_IN.toString(),
      createdAt: TestConstants.TEST_CREATED_AT.toString(),
      refreshToken: TestConstants.TEST_REFRESH_TOKEN.toString()
    }
  }

  public static userInfoWithEmail(email: string): UserInfo {
    return {
      email: email,
      idToken: TestConstants.TEST_ID_TOKEN.toString(),
      expiresIn: TestConstants.TEST_EXPIRED_IN.toString(),
      createdAt: TestConstants.TEST_CREATED_AT.toString(),
      refreshToken: TestConstants.TEST_REFRESH_TOKEN.toString()
    }
  }

  public static refreshTokenResponse(): RefreshTokenResponse {
    return {
      idToken: TestConstants.TEST_ID_TOKEN,
      refreshToken: TestConstants.TEST_REFRESH_TOKEN,
      tokenType: TestConstants.TEST_TOKEN_TYPE,
      expiresInSeconds: TestConstants.TEST_EXPIRED_IN,
      projectId: TestConstants.TEST_PROJECT_ID,
      userId: TestConstants.TEST_USER_ID
    }

  }
}