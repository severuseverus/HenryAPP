import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: UserService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (await this.auth.isUserLoggedIn()) {
        return true;
      }

      this.router.navigate(['login']);
      return false;
  }
  
}
