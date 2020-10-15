import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (!!localStorage.getItem("user")) {
      console.log('AuthGuard#canActivate called');

      console.log("route1")
      return true;
    } else {
      console.log("route")
      this.router.navigate(['/auth/login'])

    }
    return false;


  }
}