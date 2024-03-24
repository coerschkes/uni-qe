import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {FirebaseApiService} from "./firebase-api.service";
import {RefreshTokenResponse, SignInResponse, SignUpResponse} from "./firebase-api";
import {FirebaseUrlProvider} from "./url/firebase-url-provider";

describe('FirebaseApiService', () => {
  const TEST_EMAIL = "test@test.com";
  const TEST_EXPIRATION_TIME = "3600";
  const TEST_ID_TOKEN = "testIdToken";
  const TEST_KIND = "testKind";
  const TEST_REFRESH_TOKEN = "testRefreshToken";
  const TEST_LOCAL_ID = "testLocalId";
  const TEST_PASSWORD = "test password";

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let firebaseApiService: FirebaseApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    firebaseApiService = TestBed.inject(FirebaseApiService)
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send valid firebase signup request', () => {
    const expectedResponse: SignUpResponse = {
      email: TEST_EMAIL,
      expiresInSeconds: TEST_EXPIRATION_TIME,
      idToken: TEST_ID_TOKEN,
      kind: TEST_KIND,
      refreshToken: TEST_REFRESH_TOKEN,
      localId: TEST_LOCAL_ID
    }

    firebaseApiService.signUp({email: TEST_EMAIL, password: TEST_PASSWORD, returnToken: true})
      .subscribe(response => expect(response).toEqual(expectedResponse))

    const result = httpTestingController.expectOne(FirebaseUrlProvider.signUp());

    expect(result.request.method).toEqual('POST');

    result.flush(expectedResponse);
  });

  it('should send valid firebase sign in request', () => {
    const expectedResponse: SignInResponse = {
      email: TEST_EMAIL,
      expiresInSeconds: TEST_EXPIRATION_TIME,
      idToken: TEST_ID_TOKEN,
      kind: TEST_KIND,
      refreshToken: TEST_REFRESH_TOKEN,
      localId: TEST_LOCAL_ID,
      inUse: true
    }

    firebaseApiService.signIn({email: TEST_EMAIL, password: TEST_PASSWORD, returnToken: true})
      .subscribe(response => expect(response).toEqual(expectedResponse))

    const result = httpTestingController.expectOne(FirebaseUrlProvider.signIn());

    expect(result.request.method).toEqual('POST');

    result.flush(expectedResponse);
  });

  it('should send valid firebase refresh token request', () => {
    const expectedResponse: RefreshTokenResponse = {
      userId: "testUserId",
      expiresInSeconds: TEST_EXPIRATION_TIME,
      idToken: TEST_ID_TOKEN,
      refreshToken: TEST_REFRESH_TOKEN,
      projectId: "testProjectId",
      tokenType: "testTokenType",
    }

    firebaseApiService.refreshToken({refresh_token: TEST_REFRESH_TOKEN, grant_type: "refresh_token"})
      .subscribe(response => expect(response).toEqual(expectedResponse))

    const result = httpTestingController.expectOne(FirebaseUrlProvider.refreshToken());

    expect(result.request.method).toEqual('POST');

    result.flush(expectedResponse);
  });
});
