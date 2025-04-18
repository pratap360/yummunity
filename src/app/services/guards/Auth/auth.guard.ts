import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppwriteService } from '../../../../lib/appwrite.service';
import { lastValueFrom } from 'rxjs';
export const authGuard: CanActivateFn = async (route, state) => {

  const router: Router = inject(Router);
  const appwriteService: AppwriteService = inject(AppwriteService);

  try {
    const loggedUser = await lastValueFrom (appwriteService.getCurrentUser());
    // console.log("Auth guard check:", loggedUser);
    if(loggedUser){
      return true;
    }else{
      router.navigate(['login']);
      return false;
    }
  } catch (error) {
    console.error('Auth guard error:', error);
    router.navigate(['/login']);
    return false;
  }
};
