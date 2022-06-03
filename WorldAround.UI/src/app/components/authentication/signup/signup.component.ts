import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/app/models/registration';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AbstractControl, AsyncValidator, FormBuilder, FormGroup, ValidationErrors, } from '@angular/forms';
import { Validators } from '@angular/forms';
import { identical } from 'src/app/validation/form-validation';
import { Observable } from 'rxjs';
import { ConfirmPasswordAbstractControlValidation, EmailAbstractControlValidation, PasswordAbstractControlValidation, UsernameAbstractControlValidation } from 'src/app/validation/authentication-control-validation';
import { IValidationModel } from 'src/app/models/validation/interfaces/IValidationModel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../authentication.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AsyncValidator {

  model: RegistrationModel;
  signUpForm: FormGroup;
  validation: {
    email: IValidationModel,
    username: IValidationModel,
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
      'email': [null, [Validators.required, Validators.email]],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'confirm-password': [null]
    }, { validators: identical('password', 'confirm-password') });

    this.validation = {
      email: new EmailAbstractControlValidation(this.signUpForm.get('email')),
      username: new UsernameAbstractControlValidation(this.signUpForm.get('username')),
      password: new PasswordAbstractControlValidation(this.signUpForm.get('password')),
      confirmPassword: new ConfirmPasswordAbstractControlValidation(this.signUpForm.get('confirm-password')),
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

    if (this.signUpForm.valid) {
      return;
    }

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

  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    throw new Error('Method not implemented.');
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
