import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/models/login';
import { AuthorizationService } from 'src/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, AfterViewInit {

  @ViewChild('logUserName') userName: ElementRef;

  public loginModel: LoginModel = new LoginModel();
  public loginBtnDisabled: boolean = false;

  constructor(private router: Router,
    private authService: AuthorizationService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  ngAfterViewInit() {
    console.log(this.userName);
    this.userName.nativeElement.focus();
  }

  ngOnDestroy() {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  openSignUp() {

    this.dialogRef.afterClosed()
      .subscribe(() => {
        this.dialog.open(SignupComponent, {
          panelClass: 'authentication-modal'
        });
      })
    this.dialogRef.close();
  }

  login() {

    this.authService.Authorize(this.loginModel)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.toastr.success('Authentication passed');
          this.dialogRef.close();
        },
        error: () => { this.toastr.error('Wrong credentials!'); }
      });
  }
}
