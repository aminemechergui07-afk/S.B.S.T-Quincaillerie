import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../auth/auth';

export const loginGuard: CanActivateFn = (route, state) => {
    const _auth = inject (Auth);
  const router = inject(Router)

  if(_auth.isLoggedIn() == false){
    return true;
  }else{
    router.navigate(['/home'])
    return false;
  }
};
