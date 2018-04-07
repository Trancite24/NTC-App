import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Toast} from '@ionic-native/toast';
import { Vibration } from '@ionic-native/vibration';
/**
 * Generated class for the GetDownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-down',
  templateUrl: 'get-down.html',
})
export class GetDownPage {

  journeyId: string;
  location: any;
  outData: any = { malechild: 0};
  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast,private vibration: Vibration) {


  }

  ionViewDidLoad() {
    /*setTimeout(() => {
      this.toast.show(this.journeyId + this.location.latitude, '5000', 'center').subscribe(
        (toast) => {
        }
      );

    },5000)*/
    this.journeyId = this.navParams.get('journeyId');
    this.location = this.navParams.get('location');
  }
  countUp(){
    this.outData.malechild ++;
    this.vibration.vibrate(100);
  }

}
