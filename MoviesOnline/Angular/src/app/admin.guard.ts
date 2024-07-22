import { CanActivateFn, Router } from '@angular/router';
import { SharingService } from './sharing.service';
import { inject, Inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let val1 = inject(SharingService).isAdmin == true;

  if (val1 == true){
    return true
  }else{
    router.navigate(['/login2'])
    return false
  }
  
};
