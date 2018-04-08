import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EndBusHaltPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-end-bus-halt',
  templateUrl: 'end-bus-halt.html',
})
export class EndBusHaltPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('outData'));
    console.log(this.navParams.get('inData'));
    console.log(this.navParams.get('outTotal'));
    console.log(this.navParams.get('inTotal'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndBusHaltPage');
  }

}
