import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { UserdbService } from '../shared/userdb.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser;
  constructor(private authSvc: ServiceService, private router: Router, private usrSvc: UserdbService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usrSvc.getUser(this.authSvc.currentUserID) ? true : false;
  }
  
}
