import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/models/registration';
import { AuthorizationService } from 'src/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../authentication.scss']
})
export class SignupComponent implements OnDestroy, AfterViewInit {

  @ViewChild('email') email: ElementRef;

  public model: RegistrationModel = new RegistrationModel();

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private dialog: MatDialog) {

    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  ngAfterViewInit() {

    this.email.nativeElement.focus();
  }

  ngOnDestroy() {

    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  openLogin() {

    this.dialogRef.afterClosed()
      .subscribe(() => {
        this.dialog.open(LoginComponent, {
          panelClass: 'authentication-modal'
        });
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
