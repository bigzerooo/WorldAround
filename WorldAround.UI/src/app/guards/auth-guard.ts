import { Injectable } from '@angular/core';
<<<<<<< HEAD:WorldAround.UI/src/app/services/auth-guard.service.ts
import { MatDialog } from '@angular/material/dialog';
import { CanActivate } from '@angular/router';
import { LoginComponent } from '../components/authentication/login/login.component';
import { AuthorizationService } from './authorization.service';
=======
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
>>>>>>> main:WorldAround.UI/src/app/guards/auth-guard.ts

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
