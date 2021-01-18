import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: ServiceService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),
      map(user => {
        console.log('User-> ', user);
        if(user) {
          return true;
        } else {
          // redirect to Login Page
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
  
}
