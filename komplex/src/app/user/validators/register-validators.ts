import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string) : ValidatorFn {
    return (group: AbstractControl) : ValidationErrors | null => {
      const control = group.get(controlName)
      const matchingControl = group.get(matchingControlName)

      if(!control || !matchingControl) {
        console.error('Form controls can not be found in the form group.')
        return { controlNotFound: false }
      }

      const error = control.value === matchingControl.value ?
        null :
        { noMatch: true }

      matchingControl.setErrors(error)

      return error
    }
  }
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value !== 'string') {
      return { password: { value: control.value } };
    }

    const value = control.value;
    const hasNumber = /\d/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    return !hasNumber || !hasLowercase || !hasUppercase
      ? { password: { value: control.value } }
      : null;
  };
}
