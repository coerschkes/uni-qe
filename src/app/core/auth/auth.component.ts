// noinspection JSIgnoredPromiseFromCall

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
export class AuthComponent {
  private readonly authService: AuthService;
  private readonly authComponentStateService: AuthComponentStateService;
  private readonly router: Router;

  constructor(authService: AuthService, authComponentStateService: AuthComponentStateService, router: Router) {
    this.authService = authService;
    this.authComponentStateService = authComponentStateService;
    this.router = router;
  }

  onSwitchMode() {
    this.authComponentStateService.switchLoginMode()
  }

  onSubmit(authForm: NgForm) {
    if (authForm.valid) {
      this.authComponentStateService.authForm = authForm
      const email: string = authForm.value.email
      const password: string = authForm.value.password
      if (this.authComponentStateService.isLoginMode()) {
        this.login(email, password)
      } else {
        this.signUp(email, password)
      }
    }
  }

  login(email: string, password: string) {
    //todo: set is loading when not complete
    this.authService.login(email, password).subscribe({
      next: () => {
        this.authComponentStateService.reset();
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        //todo: handle error here -> mapper?
        console.log(err)
      }
    });
  }

  signUp(email: string, password: string) {
    //todo: set is loading when not complete
    this.authService.signUp(email, password)
      .subscribe({
        next: () => {
          this.authComponentStateService.reset();
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          //todo: handle error here -> mapper?
          console.log(err)
        }
      });
  }

  get loginMode(): boolean {
    return this.authComponentStateService.isLoginMode()
  }
}
