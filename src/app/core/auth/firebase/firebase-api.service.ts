import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  BasicAuthenticationPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
  LoginResponse,
  SignUpResponse
} from "./firebase-api";
import {FirebaseUrlProvider} from "./url/firebase-url-provider";

@Injectable({providedIn: "root"})
export class FirebaseApiService {
  private readonly _httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public signUp(payload: BasicAuthenticationPayload) {
    return this._httpClient.post<SignUpResponse>(FirebaseUrlProvider.signUp(), payload)
  }

  public login(payload: BasicAuthenticationPayload) {
    return this._httpClient.post<LoginResponse>(FirebaseUrlProvider.login(), payload)
  }

  public refreshToken(payload: RefreshTokenPayload) {
    return this._httpClient.post<RefreshTokenResponse>(FirebaseUrlProvider.refreshToken(), payload)
  }

}
