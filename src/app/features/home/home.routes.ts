import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Routes} from '@angular/router';
import {authGuard} from '../../core/guard/auth.guard';

export const home_routes: Routes = [
  {path: '', redirectTo: 'rent-serve', pathMatch: 'full'},
  {path: 'rent-serve', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
]
