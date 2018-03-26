import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { VerperfilPage } from '../pages/verperfil/verperfil';
import { PersonaDaoProvider } from '../providers/persona-dao/persona-dao';
import { VistaModiPage } from '../pages/vista-modi/vista-modi';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VerperfilPage,
    VistaModiPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VerperfilPage,
    VistaModiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PersonaDaoProvider
  ]
})
export class AppModule {}
