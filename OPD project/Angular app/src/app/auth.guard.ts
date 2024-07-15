import { CanActivateFn, Router } from '@angular/router';
import { SharingService } from './sharing.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let router =inject(Router);
  let val1 = inject(SharingService).isLoggedIn == true;
  if (val1== true){
     return true;
  }
   else{
    router.navigate(['/loginform'])
    return false;
  }
 
};
