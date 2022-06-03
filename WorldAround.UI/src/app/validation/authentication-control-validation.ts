import { AbstractControl } from "@angular/forms";
import { IValidationModel } from "../models/validation/interfaces/IValidationModel";

export class AbstractControlValidation {

  isValid = (): boolean => !(this.control.errors);

  constructor(protected control: AbstractControl) { }
}

export class EmailAbstractControlValidation extends AbstractControlValidation implements IValidationModel {

  message = (): string | null => {

    if (this.control.hasError('required'))
      return 'Email is required';
    if (this.control.hasError('email'))
      return 'Please enter a valid email';
    if (this.control.hasError('unique'))
      return 'The email is already used';

    return null;
  }

  constructor(email: AbstractControl) {
    super(email)
  }
}

export class UsernameAbstractControlValidation extends AbstractControlValidation implements IValidationModel {

  message = (): string | null => {

    if (this.control.hasError('required'))
      return 'Username is required';
    if (this.control.hasError('unique'))
      return 'Specified username already exists';

    return null;
  }

  constructor(username: AbstractControl) {
    super(username)
  }
}

export class PasswordAbstractControlValidation extends AbstractControlValidation implements IValidationModel {

  message = (): string | null => {

    if (this.control.hasError('required'))
      return 'Password is required';

    return null;
  };

  constructor(password: AbstractControl) {
    super(password);
  }
}

export class ConfirmPasswordAbstractControlValidation extends AbstractControlValidation implements IValidationModel {

  message = (): string | null => {

    if (this.control.hasError('required'))
      return 'Confirmation is required';
    if (this.control.hasError('identical'))
      return 'Passwords are not the same';

    return null;
  }

  constructor(confirmPassword: AbstractControl) {
    super(confirmPassword);
  }
}

export class LoginAbstractControlValidation extends AbstractControlValidation implements IValidationModel {

  message = (): string | null => {

    if (this.control.hasError('required'))
      return 'Login is required';

    return null;
  }

  constructor(confirmPassword: AbstractControl) {
    super(confirmPassword);
  }
}
