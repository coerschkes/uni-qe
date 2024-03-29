import {Routes} from '@angular/router';
import {AuthComponent} from "./core/auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [{path: 'auth', component: AuthComponent}, {path: 'dashboard', component: DashboardComponent}];
