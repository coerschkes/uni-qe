// noinspection TypeScriptValidateTypes

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from "./auth.component";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {TestConstants, TestObjectProvider} from "../../../util/test-object-provider.spec";
import {LoginResponse, SignUpResponse} from "../../external/firebase/firebase-api";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

let component: AuthComponent;
let fixture: ComponentFixture<AuthComponent>;
let httpClient: HttpClient;
let httpTestingController: HttpTestingController;
let stateService: any;
let mockAuthService: any;
let mockRouter: any;

describe('AuthComponent', () => {

  beforeEach(async () => {
    await configureTestBed()
    stateService = TestBed.inject(AuthComponentStateService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSwitchMode() should switch loginMode in AuthComponentStateService', () => {
    expect(stateService.isLoginMode()).toBeFalse()
    component.onSwitchMode()
    expect(stateService.isLoginMode()).toBeTrue()
    component.onSwitchMode()
    expect(stateService.isLoginMode()).toBeFalse()
  });

  it('should call login on authService on login() with email and password', () => {
    mockAuthService.login.and.returnValue(mockLoginResponse())
    component.login(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(mockAuthService.login).toHaveBeenCalledWith(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  });

  it('should call signUp on authService on signUp() with email and password', () => {
    mockAuthService.signUp.and.returnValue(mockSignUpResponse())
    component.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(mockAuthService.signUp).toHaveBeenCalledWith(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  });

  it('should redirect to dashboard if login() with email and password is successful', () => {
    mockAuthService.login.and.returnValue(mockLoginResponse())
    component.login(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'])
  });

  //todo: test for showing congrats message when registering, "redirect" to login
  //      for now: switch to login, reset all and use login flow
  it('should switch to login mode if signUp() with email and password is successful', () => {
    mockAuthService.signUp.and.returnValue(mockSignUpResponse())
    component.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(stateService.isLoginMode()).toBeTrue()
    expect(mockRouter.navigate).not.toHaveBeenCalledWith(['/dashboard'])
  });

  it('should reset the state service if the authForm is valid and the signup is successful', () => {
    mockAuthService.signUp.and.returnValue(mockSignUpResponse())
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.authForm()).toBeUndefined();
  })

  it('should reset the state service if the authForm is valid and the login is successful', () => {
    stateService.switchLoginMode()
    mockAuthService.login.and.returnValue(mockSignUpResponse())
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.authForm()).toBeUndefined();
  })

  it('should not reset the state service if the authForm is valid but the signup is not successful', () => {
    mockAuthService.signUp.and.returnValue(throwError(() => 'test'))
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.authForm()).toEqual(form)
  });

  it('should not reset the state service if the authForm is valid but the login is not successful', () => {
    stateService.switchLoginMode()
    mockAuthService.login.and.returnValue(throwError(() => 'test'))
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.authForm()).toEqual(form)
  });

  it('should not interact with the auth service if the authForm is not valid', () => {
    mockAuthService.signUp.and.returnValue(throwError(() => 'test'))
    const form = new NgForm([], [])
    form.control.setErrors({'incorrect': true})
    component.onSubmit(form)
    expect(mockAuthService.signUp).not.toHaveBeenCalled()
  })

  it('should switch the loading state when calling the auth service in signUp()', async () => {
    TestBed.resetTestingModule()
    stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
    await configureTestBed({provide: AuthComponentStateService, useValue: stateService})

    stateService.isLoginMode.and.returnValue(false)
    mockAuthService.signUp.and.returnValue(mockSignUpResponse())
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
  });

  it('should switch the loading state when calling the auth service in signUp() with err', async () => {
    TestBed.resetTestingModule()
    stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
    await configureTestBed({provide: AuthComponentStateService, useValue: stateService})

    stateService.isLoginMode.and.returnValue(false)
    mockAuthService.signUp.and.returnValue(throwError(() => 'test'))
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
    expect(stateService.reset).not.toHaveBeenCalled()
  })

  it('should switch the loading state when calling the auth service in login()', async () => {
    TestBed.resetTestingModule()
    stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
    await configureTestBed({provide: AuthComponentStateService, useValue: stateService})

    stateService.isLoginMode.and.returnValue(true)
    mockAuthService.login.and.returnValue(mockSignUpResponse())
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'])
  });

  it('should switch the loading state when calling the auth service in login() with err', async () => {
    TestBed.resetTestingModule()
    stateService = jasmine.createSpyObj('authComponentStateService', ['switchLoading', 'isLoginMode', 'reset'])
    await configureTestBed({provide: AuthComponentStateService, useValue: stateService})

    stateService.isLoginMode.and.returnValue(true)
    mockAuthService.login.and.returnValue(throwError(() => 'test'))
    const form = new NgForm([], []);
    component.onSubmit(form)
    expect(stateService.switchLoading).toHaveBeenCalledTimes(2)
    expect(stateService.reset).not.toHaveBeenCalled()
  })
});

async function configureTestBed(stateServiceProvider?: any) {
  mockAuthService = jasmine.createSpyObj('authService', ['login', 'signUp']);
  mockRouter = jasmine.createSpyObj('router', ['navigate'])
  let providers: any[] = [
    {provide: AuthService, useValue: mockAuthService},
    {provide: Router, useValue: mockRouter}
  ]
  if (stateServiceProvider !== undefined) {
    providers.push(stateServiceProvider)
  }
  await TestBed.configureTestingModule({
    providers: providers,
    imports: [AuthComponent, HttpClientTestingModule]
  })
    .compileComponents();

  fixture = TestBed.createComponent(AuthComponent);
  component = fixture.componentInstance;
  httpClient = TestBed.inject(HttpClient);
  httpTestingController = TestBed.inject(HttpTestingController);
  fixture.detectChanges();
}

function mockLoginResponse(): Observable<LoginResponse> {
  return new Observable<LoginResponse>(subscriber => subscriber.next(TestObjectProvider.loginResponse()));
}

function mockSignUpResponse(): Observable<SignUpResponse> {
  return new Observable<SignUpResponse>(subscriber => subscriber.next(TestObjectProvider.signUpResponse()))
}