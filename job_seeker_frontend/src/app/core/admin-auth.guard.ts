import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service'; // Path relative to src/app/core/

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated() && this.authService.getUserType() === 'admin') {
      return true; // User is authenticated and is an admin
    } else {
      // User is not authenticated or not an admin, redirect to login page
      console.warn('AdminAuthGuard: Access denied. User not authenticated as admin. Redirecting to login.');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login, preserving intended URL
      return false;
    }
  }
}
