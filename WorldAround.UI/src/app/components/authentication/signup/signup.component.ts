import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/app/models/registration';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { identical } from 'src/app/validation/form-validation';
import { ConfirmPasswordAbstractControlValidation, EmailAbstractControlValidation, PasswordAbstractControlValidation, UsernameAbstractControlValidation } from 'src/app/validation/authentication-control-validation';
import { IValidationModel } from 'src/app/models/validation/interfaces/IValidationModel';
import { FormControlHelper } from 'src/app/helpers/form-control-helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../authentication.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  model: RegistrationModel;
  signUpForm: FormGroup;
  validation: {
    email: IValidationModel,
    userName: IValidationModel,
    password: IValidationModel,
    confirmPassword: IValidationModel
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthorizationService,
    private readonly toastr: ToastrService,
    private readonly dialogRef: MatDialogRef<SignupComponent>,
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
    this.model = new RegistrationModel();
    this.signUpForm = this.formBuilder.group({
      'email': [this.model.email, [Validators.required, Validators.email]],
      'userName': [this.model.userName, Validators.required],
      'password': [this.model.password, Validators.required],
      'confirmPassword': [this.model.confirmPassword],
    }, { validators: identical('password', 'confirmPassword') });

    this.validation = {
      email: new EmailAbstractControlValidation(this.signUpForm.get('email')),
      userName: new UsernameAbstractControlValidation(this.signUpForm.get('userName')),
      password: new PasswordAbstractControlValidation(this.signUpForm.get('password')),
      confirmPassword: new ConfirmPasswordAbstractControlValidation(this.signUpForm.get('confirmPassword')),
    };
  }

  ngOnDestroy(): void {
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
  }

  openLogin(): void {

    this.dialogRef.afterClosed()
      .subscribe(() => {
        this.dialog.open(LoginComponent, {
          panelClass: 'authentication-modal'
        });
      })
    this.dialogRef.close();
  }

  onSubmit(): void {

    if (!this.signUpForm.valid) {
      return;
    }

    console.log(this.model);
    FormControlHelper.mapToModel(this.model, this.signUpForm);
    console.log(this.model);
    this.authService.signUp(this.model)
      .subscribe({
        next: () => {
          this.toastr.success('Successful!');
          this.router.navigate(['authentication/login']);
          this.dialogRef.close();
        },
        error: (response) => {
          console.log(response);
          response.error.forEach((e: { code: string; }) => {
            this.toastr.error(e.code);
          });
        }
      });
  }
}
