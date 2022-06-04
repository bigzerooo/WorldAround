import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IValidationModel } from 'src/app/models/validation/interfaces/IValidationModel';
import { LoginAbstractControlValidation } from 'src/app/validation/authentication-control-validation';
import { FormControlHelper } from 'src/app/helpers/form-control-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginModel: LoginModel = new LoginModel();
  loginBtnDisabled: boolean = false;
  validation: {
    login: IValidationModel,
  }

  constructor(private readonly router: Router,
    private readonly authService: AuthorizationService,
    private readonly toastr: ToastrService,
    private readonly dialogRef: MatDialogRef<LoginComponent>,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
    this.loginForm = this.formBuilder.group({
      'login': [null, [Validators.required]],
      'password': [null]
    });
    this.validation = {
      login: new LoginAbstractControlValidation(this.loginForm.get('login'))
    };
  }

  ngOnDestroy(): void {

    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  openSignUp(): void {

    this.dialogRef.afterClosed()
      .subscribe(() => {
        this.dialog.open(SignupComponent, {
          panelClass: 'authentication-modal'
        });
      })
    this.dialogRef.close();
  }

  onSubmit(): void {

    if(!this.loginForm.valid) {
      return;
    }

    FormControlHelper.mapToModel(this.loginModel, this.loginForm);
    this.loginBtnDisabled = true;
    this.authService.authorize(this.loginModel)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.toastr.success('Authentication passed');
          this.dialogRef.close();
        },
        error: () => {
          this.toastr.error('Wrong credentials!');
        },
      })
      .add(() => {
        this.loginBtnDisabled = false;
      });
  }
}
