import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AlertController} from 'ionic-angular';

/*import {NewBusHaltPage} from "../pages/new-bus-halt/new-bus-halt";
import {GetDownPage} from "../pages/get-down/get-down";
import {EndBusHaltPage} from "../pages/end-bus-halt/end-bus-halt";
import {SyncLaterPage} from "../pages/sync-later/sync-later";*/

import {Keyboard} from '@ionic-native/keyboard';
import {Insomnia} from '@ionic-native/insomnia';

import {HomePage} from '../pages/home/home';
import {NewBusHaltPage} from "../pages/new-bus-halt/new-bus-halt";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private alertCtrl: AlertController,
    private insomnia: Insomnia
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.keyboard.disableScroll(false);
      //this.insomnia.keepAwake().then( () => {});

      platform.registerBackButtonAction(
        () => {

          let alert = this.alertCtrl.create({
            title: 'ඉවත්වීම',
            message: 'මෙම යෙදුමෙන් ඉවත්වීම තහවුරු කරන්නේද?',
            buttons: [
              {
                text: 'නැත',
                role: 'cancel',
                handler: () => {

                }
              },
              {
                text: 'ඔව්',
                handler: () => {

                  navigator['app'].exitApp();
                }
              }
            ]
          });
          alert.present();
        }
      )
    });
  }
}

