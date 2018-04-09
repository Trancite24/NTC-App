import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewBusHaltPage } from "../pages/new-bus-halt/new-bus-halt";
import { GetDownPage } from "../pages/get-down/get-down";
import { EndBusHaltPage } from "../pages/end-bus-halt/end-bus-halt";
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private keyboard: Keyboard) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.keyboard.disableScroll(false);
    });
  }
}

