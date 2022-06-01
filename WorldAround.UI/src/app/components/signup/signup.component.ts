import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/models/registration';
import { AuthorizationService } from 'src/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnDestroy {

  model: RegistrationModel = new RegistrationModel();

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private dialog: MatDialog) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  ngOnDestroy() {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  openLogin() {

    this.dialogRef.beforeClosed()
      .subscribe(() => {
        this.dialog.open(LoginComponent);
      })
    this.dialogRef.close();
  }

  onSubmit() {
    this.authService.SignUp(this.model)
      .subscribe({
        next: () => {
          this.toastr.success('Successful!');
          this.router.navigate(['authentication/login']);
          this.dialogRef.close();
        },
        error: (response) => {
          response.error.forEach((e: { code: string; }) => {
            this.toastr.error(e.code);
          });
        }
      });
  }
}
