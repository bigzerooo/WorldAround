import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersGateway } from 'src/app/gateways/users.gateway';
import { UpdateUserModel } from 'src/app/models/users/update-user';
import { UserDetailsModel } from 'src/app/models/users/user-details';
import { IValidationModel } from 'src/app/models/validation/interfaces/IValidationModel';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConfirmPasswordAbstractControlValidation, EmailAbstractControlValidation, PasswordAbstractControlValidation, UniqueLoginValidator, UsernameAbstractControlValidation } from 'src/app/validation/authentication-control-validation';
import { identical } from 'src/app/validation/form-validation';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  model: UpdateUserModel;
  formGroup: FormGroup;
  validation: {
    email: IValidationModel,
    userName: IValidationModel,
    password: IValidationModel,
    confirmPassword: IValidationModel
  }

  constructor(
    private readonly toastr: ToastrService,
    private readonly formBuilder: FormBuilder,
    private readonly loginValidator: UniqueLoginValidator,
    private readonly usersGateway: UsersGateway,
    private readonly authService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.model = new UpdateUserModel();
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
    this.formGroup = this.formBuilder.group({
      'firstName': [this.model.firstName],
      'lastName': [this.model.lastName],
      'email': [this.model.email, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.loginValidator.validate.bind(this.loginValidator)],
        updateOn: 'blur'
      }],
      'userName': [this.model.userName, {
        validators: [Validators.required],
        asyncValidators: [this.loginValidator.validate.bind(this.loginValidator)],
        updateOn: 'blur'
      }],
      'password': [null, Validators.required],
      'confirmPassword': [null, Validators.required],
    }, { validators: identical('password', 'confirmPassword') });

    this.validation = {
      email: new EmailAbstractControlValidation(this.formGroup.get('email')),
      userName: new UsernameAbstractControlValidation(this.formGroup.get('userName')),
      password: new PasswordAbstractControlValidation(this.formGroup.get('password')),
      confirmPassword: new ConfirmPasswordAbstractControlValidation(this.formGroup.get('confirmPassword')),
    };
    this.usersGateway.getUserById(this.authService.getUserId())
      .subscribe(result => {
        this.model = <UpdateUserModel>result;
        Object.keys(this.model).forEach(key => {
          if (key != 'id') {
            this.formGroup.get(key).reset(this.model[key]);
          }
        });
      });
  }

  updateField(controlName): void {

    let control = this.formGroup.get(controlName);

    if(!control.valid) {
      return;
    }

    let user = new UpdateUserModel;
    user.id = this.model.id;
    user[controlName] = control.value;

    this.usersGateway.update(user)
    .subscribe(result => {
      this.model[controlName] = result[controlName];
      this.reset(controlName);
    });
  }

  reset(controlName) {
    this.formGroup.get(controlName).reset(this.model[controlName]);
  }

  onSubmit() {
  }
}
