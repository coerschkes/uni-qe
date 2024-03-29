import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
//todo: style
//todo: test this component
export class AuthComponent {
  private readonly authService: AuthService;
  private readonly authComponentStateService: AuthComponentStateService;

  constructor(authService: AuthService, authComponentStateService: AuthComponentStateService) {
    this.authService = authService;
    this.authComponentStateService = authComponentStateService;
  }

  onSwitchMode() {
    this.authComponentStateService.switchLoginMode()
  }

  //todo: how to test?
  onSubmit(authForm: NgForm) {
    const email: string = authForm.value.email
    const password: string = authForm.value.password
    if (this.authComponentStateService.isLoginMode()) {
      this.login(email, password)
    } else {
      this.signUp(email, password)
    }
    //todo: do I want to reset here? Better: let the form as it is to provide the user with his entered information
    // authForm.reset()
    // this.authComponentStateService.reset()
    // => reset on navigation/on success of login or sign up!
  }

  login(email: string, password: string) {
    //todo: redirect
    //todo: error handling
    //todo: set is loading when not complete
    this.authService.login(email, password);
  }

  signUp(email: string, password: string) {
    //todo: redirect
    //todo: error handling
    //todo: set is loading when not complete
    this.authService.signUp(email, password);
  }

  get loginMode(): boolean {
    return this.authComponentStateService.isLoginMode()
  }
}
