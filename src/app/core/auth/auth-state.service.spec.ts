import {AuthStateService} from "./auth-state.service";
import {UserInfo} from "./user-info";

describe('AuthStateService', () => {
  it('isLoggedIn should return false as initial value', () => {
    const service = new AuthStateService();

    expect(service.isLoggedIn()).toBeFalse()
  });

  it('isLoggedIn should return true if user is authenticated', () => {
    const userInfo: UserInfo = {email: "", idToken: "", refreshToken: "", createdAt: "", expiresIn: ""}
    const service = new AuthStateService();
    service.authenticate(userInfo)

    expect(service.isLoggedIn()).toBeTrue()
  });

  it('isLoggedIn should return false if user is invalidated after being logged in', () => {
    const userInfo: UserInfo = {email: "", idToken: "", refreshToken: "", createdAt: "", expiresIn: ""}
    const service = new AuthStateService();
    service.authenticate(userInfo)
    service.invalidate()

    expect(service.isLoggedIn()).toBeFalse()
  });

  it('userInfo should return undefined as initial value', () => {
    const service = new AuthStateService();

    expect(service.userInfo()).toBeUndefined()
  });

  it('userInfo should return userInfo if user is authenticated', () => {
    const userInfo: UserInfo = {email: "", idToken: "", refreshToken: "", createdAt: "", expiresIn: ""}
    const service = new AuthStateService();
    service.authenticate(userInfo)

    expect(service.userInfo()).toEqual(userInfo)
  });

  it('authenticate should update userInfo with given value', () => {
    const firstUserInfo: UserInfo = {email: "first", idToken: "", refreshToken: "", createdAt: "", expiresIn: ""}
    const secondUserInfo: UserInfo = {email: "second", idToken: "", refreshToken: "", createdAt: "", expiresIn: ""}
    const service = new AuthStateService();
    service.authenticate(firstUserInfo)
    service.authenticate(secondUserInfo)

    expect(service.userInfo()).toEqual(secondUserInfo)
  });

});
