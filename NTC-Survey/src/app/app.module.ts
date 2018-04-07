import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewJourneyPage } from '../pages/new-journey/new-journey';
import { NewBusHaltPage } from '../pages/new-bus-halt/new-bus-halt';
import { GetDownPage } from '../pages/get-down/get-down';
import {SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {Geolocation} from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewJourneyPage,
    NewBusHaltPage,
    GetDownPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewJourneyPage,
    NewBusHaltPage,
    GetDownPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    Geolocation,
    Vibration
  ]
})
export class AppModule {}
