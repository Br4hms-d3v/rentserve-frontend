import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Allows to enter the application unless it is not connected
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to home
    router.navigate(['']).then(r => false);
    return false;
  }
};
