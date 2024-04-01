// noinspection TypeScriptValidateTypes

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from "./auth.component";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {TestConstants, TestObjectProvider} from "../../util/test-object-provider.spec";
import {LoginResponse, SignUpResponse} from "./firebase/firebase-api";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let stateService: AuthComponentStateService;
  let fixture: ComponentFixture<AuthComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('authService', ['login', 'signUp']);
    mockRouter = jasmine.createSpyObj('router', ['navigate'])
    await TestBed.configureTestingModule({
      providers: [{provide: AuthService, useValue: mockAuthService}, {provide: Router, useValue: mockRouter}],
      imports: [AuthComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    stateService = TestBed.inject(AuthComponentStateService)
    fixture.detectChanges();
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

  it('should redirect to dashboard if signUp() with email and password is successful', () => {
    mockAuthService.signUp.and.returnValue(mockSignUpResponse())
    component.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'])
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
});

function mockLoginResponse(): Observable<LoginResponse> {
  return new Observable<LoginResponse>(subscriber => subscriber.next(TestObjectProvider.loginResponse()));
}

function mockSignUpResponse(): Observable<SignUpResponse> {
  return new Observable<SignUpResponse>(subscriber => subscriber.next(TestObjectProvider.signUpResponse()))
}
