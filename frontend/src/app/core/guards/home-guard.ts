import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { inject } from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {
    const _auth = inject (Auth)
  const router = inject (Router)

  if(_auth.isLoggedIn() == true){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};
