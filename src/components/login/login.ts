import { Storage } from '@ionic/storage';
import { ApiHelper } from './../../providers/api-helper';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsernameValidator } from './../../Validators/username';
import { PasswordValidator } from './../../Validators/password';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  private loginForm;
  private signupForm;
  private formType;

  constructor(private formBuilder: FormBuilder, private apiHelper: ApiHelper, private storage: Storage, public viewCtrl: ViewController) {
    this.formType = true;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required, new UsernameValidator(apiHelper).checkUsername],
      password: ['', Validators.required],
      password_retype: ['', Validators.compose([Validators.required])],
      email: ['', Validators.required],
      fullname: ['']
    }, { validator: PasswordValidator.validate });
  }

  extractData = (form: FormGroup, action: string): any => {
    if (action === 'login') {
      return {
        username: form.controls['username'].value,
        password: form.controls['password'].value
      };

    } else if (action === 'signup') {
      if (form.controls['fullname'].value) {
        return {
          username: form.controls['username'].value,
          password: form.controls['password'].value,
          email: form.controls['email'].value,
          full_name: form.controls['fullname'].value
        };
      } else {
        return {
          username: form.controls['username'].value,
          password: form.controls['password'].value,
          email: form.controls['email'].value
        }
      }
    } else {
      console.log('unknown form');
    }
  }

  login(data) {
    return this.apiHelper.login(data).map(res => res.json());
  }

  signup(data) {
    return this.apiHelper.signup(data).map(res => res.json());
  }

  saveData(observable) {
    return new Promise(resolve => {
      observable.subscribe(res => {
        this.storage.set('userToken', res.token);
        this.storage.set('userID', res.user.user_id);
        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      });
    });
  }

  checkAndDismiss(data) {
    data.then (res=>{
      if (res) {
        this.viewCtrl.dismiss();
      } else {
        console.log('error login');
      }
    });
  }

  logForm() {
    console.log(this.loginForm.value);
    let formData = this.extractData(this.loginForm, 'login');
    let observable = this.login(formData);
    let data = this.saveData(observable);
    this.checkAndDismiss(data);
  }

  signForm() {
    console.log(this.signupForm.value);
    let formData = this.extractData(this.signupForm, 'signup');
    this.signup(formData).subscribe(res => {
      let formData = this.extractData(this.signupForm, 'login');
      let observable = this.login(formData);
      let data = this.saveData(observable);
      this.checkAndDismiss(data);
    }, err => {
      console.log('error signup');
    });
  }

  toggle() {
    this.formType = !this.formType;
  }
}
