import { UploadComponent } from './../components/upload/upload';
import { Thumbnails } from './../pipes/thumbnails';

import { User } from './../providers/user';
import { Cards } from './../providers/cards';

import { ApiHelper } from './../providers/api-helper';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from './../pages/about/about';
import { AccountPage } from './../pages/account/account';
import { FrontPage } from './../pages/front/front';
import { LoginComponent } from './../components/login/login';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    TabsPage,
    FrontPage,
    AccountPage,
    AboutPage,
    Thumbnails,
    UploadComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    TabsPage,
    FrontPage,
    AccountPage,
    AboutPage,
    UploadComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ApiHelper, Storage, Cards, User]
})
export class AppModule { }
