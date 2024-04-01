// noinspection JSIgnoredPromiseFromCall

import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {AuthComponentStateService} from "./auth.component.state.service";
import {Router} from "@angular/router";
import {catchError, finalize, first, Observable, of, tap} from "rxjs";

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
      this.authComponentStateService.switchLoading()
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
    this.authenticationFlow(this.authService.login(email, password),
      () => {
        this.authComponentStateService.reset();
        this.router.navigate(['/dashboard']);
      },
    )
  }

  signUp(email: string, password: string) {
    this.authenticationFlow(this.authService.signUp(email, password),
      () => {
        this.authComponentStateService.reset();
        this.authComponentStateService.switchLoginMode()
      },
    )
  }

  get loginMode(): boolean {
    return this.authComponentStateService.isLoginMode()
  }

  private authenticationFlow(observable: Observable<any>, tapFn: () => void): void {
    observable
      .pipe(
        first(),
        tap(tapFn),
        catchError(err => {
            //todo: show error on component
            console.log("test")
            return of()
          },
        ),
        finalize(() => {
          this.authComponentStateService.switchLoading()
        }),
      ).subscribe()
  }
}
