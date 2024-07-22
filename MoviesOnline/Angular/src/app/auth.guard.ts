import { CanActivateFn ,Router} from '@angular/router';
import { Inject,inject } from '@angular/core';
import { SharingService } from './sharing.service';

export const authGuard: CanActivateFn = (route, state) => {
 

  let router = inject(Router);
  let val1 = inject(SharingService).isLoggedIn == true;

  if (val1 == true){
    return true
  }else{
    router.navigate(['/login2'])
    return false
  }

};
