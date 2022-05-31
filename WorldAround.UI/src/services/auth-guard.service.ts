import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router) { }

  canActivate(): boolean {

    if (!this.authorizationService.IsAuthorized()) {
      this.router.navigate(['authentication/login']);
      return false;
    }

    return true;
  }
}
