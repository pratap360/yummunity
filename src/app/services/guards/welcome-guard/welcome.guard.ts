import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppwriteService } from '../../../../lib/appwrite.service';
import { lastValueFrom } from 'rxjs';

export const welcomeGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const appwriteService: AppwriteService = inject(AppwriteService);
  
  // Check if there's a signup state in session storage
  const isSignupFlow = sessionStorage.getItem('signupFlow') === 'true';
  
  if (isSignupFlow) {
    // Clear the flag once used
    sessionStorage.removeItem('signupFlow');
    return true;
  }
  
  // If not coming from signup flow, check authentication status
  try {
    const loggedUser = await lastValueFrom(appwriteService.getCurrentUser());
    
    if (loggedUser) {
      // User is authenticated, redirect to home
      router.navigate(['/home-feed']);
    } else {
      // User is not authenticated, redirect to login
      router.navigate(['/login']);
    }
    return false;
  } catch (error) {
    // Error checking auth (likely user not authenticated)
    console.error('Welcome guard error:', error);
    router.navigate(['/login']);
    return false;
  }
};