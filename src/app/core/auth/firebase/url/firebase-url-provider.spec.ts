import {environment} from "../../../../../environments/environment";
import {FirebaseUrlProvider} from "./firebase-url-provider";
import {
  IdentityToolkitActions,
  IdentityToolkitDomain, IdentityToolkitUrl
} from "./identity-toolkit-url";

describe('FirebaseUrlProvider', () => {
  it('should return valid signIn url with valid api key', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.SIGN_IN_WITH_CUSTOM_TOKEN, environment.FIREBASE_API_KEY).toString();
    expect(FirebaseUrlProvider.signIn()).toEqual(url.toString())
  });

  it('should return valid signUp url with valid api key', () => {
    const url = new IdentityToolkitUrl(IdentityToolkitDomain.ACCOUNTS, IdentityToolkitActions.SIGN_UP, environment.FIREBASE_API_KEY).toString();
    expect(FirebaseUrlProvider.signUp()).toEqual(url.toString())
  });
});
