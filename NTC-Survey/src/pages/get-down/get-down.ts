import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Toast} from '@ionic-native/toast';
import {Vibration} from '@ionic-native/vibration';

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
  outData: any = {
    malechild: 0,
    maleyoung: 0,
    maleman: 0,
    maleelder: 0,
    femalechild: 0,
    femaleyoung: 0,
    femalewoman: 0,
    femaleelder: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast, private vibration: Vibration) {


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

  countUp(ageCategory: string) {
    switch (ageCategory) {
      case 'malechild' :
        this.outData.malechild++;
        break;
      case 'maleyoung' :
        this.outData.maleyoung++;
        break;
      case 'maleman' :
        this.outData.maleman++;
        break;
      case 'maleelder' :
        this.outData.maleelder++;
        break;
      case 'femalechild' :
        this.outData.femalechild++;
        break;
      case 'femaleyoung' :
        this.outData.femaleyoung++;
        break;
      case 'femalewoman' :
        this.outData.femalewoman++;
        break;
      case 'femaleelder' :
        this.outData.femaleelder++;
        break;
    }


  }

  countDown(ageCategory: string) {
    switch (ageCategory) {
      case 'malechild' :
        if (this.outData.malechild > 0) {this.outData.malechild --; this.vibratePhone(20)}
        break;
      case 'maleyoung' :
        if (this.outData.maleyoung > 0) {this.outData.maleyoung --; this.vibratePhone(20)}
        break;
      case 'maleman' :
        if (this.outData.maleman > 0) {this.outData.maleman --; this.vibratePhone(20)}
        break;
      case 'maleelder' :
        if (this.outData.maleelder > 0) {this.outData.maleelder --; this.vibratePhone(20)}
        break;
      case 'femalechild' :
        if (this.outData.femalechild > 0) {this.outData.femalechild --; this.vibratePhone(20)}
        break;
      case 'femaleyoung' :
        if (this.outData.femaleyoung > 0) {this.outData.femaleyoung --; this.vibratePhone(20)}
        break;
      case 'femalewoman' :
        if (this.outData.femalewoman > 0) {this.outData.femalewoman --; this.vibratePhone(20)}
        break;
      case 'femaleelder' :
        if (this.outData.femaleelder > 0) {this.outData.femaleelder --; this.vibratePhone(20)}
        break;
    }
  }
  vibratePhone(time: number){
    this.vibration.vibrate(time);
  }

}
