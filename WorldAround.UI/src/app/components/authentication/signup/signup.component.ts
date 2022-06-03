import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationModel } from 'src/models/registration';
import { AuthorizationService } from 'src/services/authorization.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AbstractControl, AsyncValidator, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { validateConfirmPassword } from './signup.validation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../authentication.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit, AsyncValidator {

  @ViewChild('email') email: ElementRef;

  model: RegistrationModel;

  signUpForm: FormGroup;

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
      email: [this.model.email, [Validators.required, Validators.email]],
      userName: [this.model.userName, Validators.required],
      password: [this.model.password, Validators.required],
      confirmPassword: [this.model.confirmPassword]
    }, { validators: validateConfirmPassword });
  }

  ngAfterViewInit(): void {
    this.email.nativeElement.focus();
  }

  ngOnDestroy(): void {
    console.log(this.model.email);
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
