import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { tap } from 'rxjs';
import { UserService } from '../services/user.service';



export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.validarToken().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
