import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewJourneyPage } from '../new-journey/new-journey';
import { AlertController } from 'ionic-angular';
import { v4 } from 'uuid';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginCredintials = { nic : '', password: '1234'}
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  login(nic: string, pw: string){
    console.log(v4());
    if(this.loginCredintials.password === pw){
    this.navCtrl.push(NewJourneyPage, {nic: nic});
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'මුරපදය හෝ හැදුනුම්පත් අංකය වැරදියි!',
        subTitle: 'නැවත උත්සහ කරන්න',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
