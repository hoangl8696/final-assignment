import { FormGroup } from '@angular/forms';

export class PasswordValidator {

  static validate = (signupForm: FormGroup): any => {
    let password1 = signupForm.get('password');
    let password2 = signupForm.get('password_retype');

    if ((password1.touched || password2.touched) && password1.value !== password2.value) {
      return { 'password mismatch': true };
    }
    return null;
  }
}
