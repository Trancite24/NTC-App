import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewJourneyPage } from '../pages/new-journey/new-journey';
import { NewBusHaltPage } from '../pages/new-bus-halt/new-bus-halt';
import { GetDownPage } from '../pages/get-down/get-down';
import { EndBusHaltPage } from '../pages/end-bus-halt/end-bus-halt';
import { SyncLaterPage } from '../pages/sync-later/sync-later';
import {SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {Keyboard} from '@ionic-native/keyboard';
import {Geolocation} from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';
import { Diagnostic } from '@ionic-native/diagnostic';

import { SyncerProvider } from '../providers/syncer/syncer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewJourneyPage,
    NewBusHaltPage,
    GetDownPage,
    EndBusHaltPage,
    SyncLaterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{scrollAssist: false, autoFocusAssist: false}),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewJourneyPage,
    NewBusHaltPage,
    GetDownPage,
    EndBusHaltPage,
    SyncLaterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    Geolocation,
    Vibration,
    Keyboard,
    SyncerProvider,
    HttpClient,
    Diagnostic
  ]
})
export class AppModule {}
