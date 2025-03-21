import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppwriteService } from '../../../lib/appwrite.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const appwriteService: AppwriteService = inject(AppwriteService);
  const loggedUser = appwriteService.getCurrentUser();
  console.log("getting this info form auth guard",loggedUser);
  if(loggedUser != null){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};
