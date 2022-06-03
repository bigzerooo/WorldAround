import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const validateConfirmPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsNotSame: true });
  }

  return null;
}
