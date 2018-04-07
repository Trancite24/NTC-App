import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast) {
    this.journeyId = this.navParams.get('journeyId');
    this.location = this.navParams.get('location');

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.toast.show(this.journeyId + this.location.latitude, '5000', 'center').subscribe(
        (toast) => {
        }
      );
      
    },5000)

  }

}
