import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {FirebaseApiService} from "./firebase-api.service";
import {RefreshTokenResponse, SignInResponse, SignUpResponse} from "./firebase-api";
import {FirebaseUrlProvider} from "./url/firebase-url-provider";
import {TestConstants, TestObjectProvider} from "../../../util/test-object-provider.spec";

describe('FirebaseApiService', () => {
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
    const expectedResponse: SignUpResponse = TestObjectProvider.signUpResponse()

    firebaseApiService.signUp({email: TestConstants.TEST_EMAIL, password: TestConstants.TEST_PASSWORD, returnToken: true})
      .subscribe(response => expect(response).toEqual(expectedResponse))

    const result = httpTestingController.expectOne(FirebaseUrlProvider.signUp());

    expect(result.request.method).toEqual('POST');

    result.flush(expectedResponse);
  });

  it('should send valid firebase sign in request', () => {
    const expectedResponse: SignInResponse = TestObjectProvider.signInResponse()

    firebaseApiService.signIn({email: TestConstants.TEST_EMAIL, password: TestConstants.TEST_PASSWORD, returnToken: true})
      .subscribe(response => expect(response).toEqual(expectedResponse))

    const result = httpTestingController.expectOne(FirebaseUrlProvider.signIn());

    expect(result.request.method).toEqual('POST');

    result.flush(expectedResponse);
  });

  it('should send valid firebase refresh token request', () => {
    const expectedResponse: RefreshTokenResponse = TestObjectProvider.refreshTokenResponse()

    firebaseApiService.refreshToken({refresh_token: TestConstants.TEST_REFRESH_TOKEN, grant_type: TestConstants.TEST_GRANT_TYPE})
      .subscribe(response => expect(response).toEqual(expectedResponse))

    const result = httpTestingController.expectOne(FirebaseUrlProvider.refreshToken());

    expect(result.request.method).toEqual('POST');

    result.flush(expectedResponse);
  });
});
