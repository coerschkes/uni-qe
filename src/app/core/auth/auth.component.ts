import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

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
//todo: implement state for this component (e.g. is loading, ..)
//todo: test this component
export class AuthComponent {
  private readonly authService: AuthService;
  loginMode = true;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode
  }

  onSubmit(authForm: NgForm) {
    const email: string = authForm.value.email
    const password: string = authForm.value.password
    if (this.loginMode) {
      this.signIn(email, password)
    } else {
      this.signUp(email, password)
    }
    authForm.reset()
  }

  signIn(email: string, password: string) {
    //todo: redirect
    //todo: error handling
    this.authService.signIn(email, password).subscribe(value => console.log(value))
  }

  signUp(email: string, password: string) {
    //todo: redirect
    //todo: error handling
    this.authService.signUp(email, password).subscribe(value => console.log(value))
  }
}
