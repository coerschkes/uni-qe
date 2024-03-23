import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent {
    loginMode = true;

    onSwitchMode() {
        this.loginMode = !this.loginMode
    }

    onSubmit(authForm: NgForm) {
        authForm.reset()
    }
}
