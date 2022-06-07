import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate } from '@angular/router';
import { LoginComponent } from '../components/authentication/login/login.component';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private readonly dialog: MatDialog) { }

  canActivate(): boolean {

    if (!this.authorizationService.isAuthorized()) {
      this.dialog.open(LoginComponent, {
        panelClass: 'authentication-modal'
      });
      return false;
    }

    return true;
  }
}
