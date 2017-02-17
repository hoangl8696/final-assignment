import { AboutPage } from './../about/about';
import { AccountPage } from './../account/account';
import { FrontPage } from './../front/front';
import { LoginComponent } from './../../components/login/login';
import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  Frontpage = FrontPage;
  Account = AccountPage;
  About = AboutPage;
  private value;

  constructor(private modal: ModalController, private storage: Storage, private navCtrl: NavController) {
    this.value = 10;
    this.initialize();
  }

  initialize() {
    this.checkToken().then(result => {
      console.log(result);
      if (!result) {
        this.collectData();
      }
    });
  }

  collectData() {
    let modal = this.modal.create(LoginComponent);
    modal.present();
  }

  checkToken() {
    return new Promise(resolve => {
      this.storage.get('userToken').then(token => {
        if (token === null) { resolve(false) }
        resolve(true);
      });
    });
  }

  logOut(event) {
    this.storage.clear().then(res => {
      this.collectData();
    });
  }

}
