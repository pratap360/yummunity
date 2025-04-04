import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppwriteService } from '../../../../lib/appwrite.service';
import { lastValueFrom } from 'rxjs';

export const publicGuardGuard: CanActivateFn =  async (route, state) => {
  const router : Router = inject(Router);
  
  const appwriteService: AppwriteService = inject(AppwriteService);

  try {
    const loggedUser = await lastValueFrom(appwriteService.getCurrentUser());
    
    if (loggedUser) {
      // If user is logged in, redirect to home-feed
      router.navigate(['/home-feed']);
      return false;
    }
    // If no user is logged in, allow access to public pages
    return true;
  } catch (error) {
    // If there's an error checking auth status, allow access to public pages
    return true;
  }
};
