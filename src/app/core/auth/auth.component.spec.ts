// noinspection TypeScriptValidateTypes

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthComponent} from "./auth.component";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {TestConstants, TestObjectProvider} from "../../util/test-object-provider.spec";
import {LoginResponse} from "./firebase/firebase-api";
import {Observable} from "rxjs";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let stateService: AuthComponentStateService;
  let fixture: ComponentFixture<AuthComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('authService', ['login', 'signUp']);
    await TestBed.configureTestingModule({
      providers: [{provide: AuthService, useValue: mockAuthService}],
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
    component.login(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(mockAuthService.login).toHaveBeenCalledWith(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  });

  it('should call signUp on authService on signUp() with email and password', () => {
    component.signUp(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
    expect(mockAuthService.signUp).toHaveBeenCalledWith(TestConstants.TEST_EMAIL, TestConstants.TEST_PASSWORD)
  });
});
