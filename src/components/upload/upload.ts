import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiHelper } from './../../providers/api-helper';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

/*
  Generated class for the Upload component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadComponent {
  private uploadForm;

  constructor(private viewCtrl: ViewController, private storage: Storage, private builder: FormBuilder, private apiHelper: ApiHelper) {
    this.uploadForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      file: ['']
    });
  }

  upload(event) {
    let form = new FormData()
    if (this.uploadForm.controls['description'].value) {
      form.append('file', event.srcElement[6].files[0]);
      form.append('title', this.uploadForm.controls['title']);
      form.append('description', this.uploadForm.controls['description']);
    } else {
      form.append('file', event.srcElement[6].files[0]);
      form.append('title', this.uploadForm.controls['title']);
    }
    this.storage.get('userToken').then(token => {
      this.apiHelper.uploadFile(form, token).subscribe(res => {
        this.viewCtrl.dismiss({ upload : true });
      }, err => {
      });
    });
  }

  cancel(event) {
    this.viewCtrl.dismiss();
  }

}
