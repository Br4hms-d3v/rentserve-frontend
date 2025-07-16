import {Routes} from '@angular/router';
import {EditUserComponent} from './edit-user/edit-user.component';
import {authGuard} from '../../core/guard/auth.guard';
import {ChangePasswordComponent} from './change-password/change-password.component';

export const user_routes: Routes = [
  {path: 'edit-profile', component: EditUserComponent, canActivate: [authGuard]},
  {path: 'edit-password', component: ChangePasswordComponent, canActivate: [authGuard]},
]
