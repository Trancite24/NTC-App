import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Platform} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Toast} from '@ionic-native/toast';
import {Vibration} from '@ionic-native/vibration';

import { EndBusHaltPage } from '../end-bus-halt/end-bus-halt';
import { NewBusHaltPage } from '../new-bus-halt/new-bus-halt';


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
  nic: string;
  location: any;
  timeStamp: string;
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
  inData: any = {
    malechild: 0,
    maleyoung: 0,
    maleman: 0,
    maleelder: 0,
    femalechild: 0,
    femaleyoung: 0,
    femalewoman: 0,
    femaleelder: 0
  };
  outTotal: number;
  inTotal: number = this.inData.malechild + this.inData.maleyoung + this.inData.maleman + this.inData.maleelder + this.inData.femalechild + this.inData.femaleyoung + this.inData.femalewoman + this.inData.femaleelder;

  status: string = "out";
  isAndroid: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toast: Toast,
    private vibration: Vibration,

    platform: Platform
  ) {

    this.isAndroid = platform.is('android');
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
    this.timeStamp = this.navParams.get('timeStamp');
    this.nic = this.navParams.get('nic');

  }

  countUp(status: string, ageCategory: string) {
    if (status === 'out') {

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
      this.outTotalCalc();

    }
    else {

      switch (ageCategory) {
        case 'malechild' :
          this.inData.malechild++;
          break;
        case 'maleyoung' :
          this.inData.maleyoung++;
          break;
        case 'maleman' :
          this.inData.maleman++;
          break;
        case 'maleelder' :
          this.inData.maleelder++;
          break;
        case 'femalechild' :
          this.inData.femalechild++;
          break;
        case 'femaleyoung' :
          this.inData.femaleyoung++;
          break;
        case 'femalewoman' :
          this.inData.femalewoman++;
          break;
        case 'femaleelder' :
          this.inData.femaleelder++;
          break;
      }
      this.inTotalCalc();


    }
  }

  countDown(status: string, ageCategory: string) {
    if (status === 'out') {


      switch (ageCategory) {
        case 'malechild' :
          if (this.outData.malechild > 0) {
            this.outData.malechild--;
            this.vibratePhone(20)
          }
          break;
        case 'maleyoung' :
          if (this.outData.maleyoung > 0) {
            this.outData.maleyoung--;
            this.vibratePhone(20)
          }
          break;
        case 'maleman' :
          if (this.outData.maleman > 0) {
            this.outData.maleman--;
            this.vibratePhone(20)
          }
          break;
        case 'maleelder' :
          if (this.outData.maleelder > 0) {
            this.outData.maleelder--;
            this.vibratePhone(20)
          }
          break;
        case 'femalechild' :
          if (this.outData.femalechild > 0) {
            this.outData.femalechild--;
            this.vibratePhone(20)
          }
          break;
        case 'femaleyoung' :
          if (this.outData.femaleyoung > 0) {
            this.outData.femaleyoung--;
            this.vibratePhone(20)
          }
          break;
        case 'femalewoman' :
          if (this.outData.femalewoman > 0) {
            this.outData.femalewoman--;
            this.vibratePhone(20)
          }
          break;
        case 'femaleelder' :
          if (this.outData.femaleelder > 0) {
            this.outData.femaleelder--;
            this.vibratePhone(20)
          }
          break;
      }
      this.outTotalCalc();
    }
    else {

      switch (ageCategory) {
        case 'malechild' :
          if (this.inData.malechild > 0) {
            this.inData.malechild--;
            this.vibratePhone(20)
          }
          break;
        case 'maleyoung' :
          if (this.inData.maleyoung > 0) {
            this.inData.maleyoung--;
            this.vibratePhone(20)
          }
          break;
        case 'maleman' :
          if (this.inData.maleman > 0) {
            this.inData.maleman--;
            this.vibratePhone(20)
          }
          break;
        case 'maleelder' :
          if (this.inData.maleelder > 0) {
            this.inData.maleelder--;
            this.vibratePhone(20)
          }
          break;
        case 'femalechild' :
          if (this.inData.femalechild > 0) {
            this.inData.femalechild--;
            this.vibratePhone(20)
          }
          break;
        case 'femaleyoung' :
          if (this.inData.femaleyoung > 0) {
            this.inData.femaleyoung--;
            this.vibratePhone(20)
          }
          break;
        case 'femalewoman' :
          if (this.inData.femalewoman > 0) {
            this.inData.femalewoman--;
            this.vibratePhone(20)
          }
          break;
        case 'femaleelder' :
          if (this.inData.femaleelder > 0) {
            this.inData.femaleelder--;
            this.vibratePhone(20)
          }
          break;
      }
      this.inTotalCalc();
    }
  }


  vibratePhone(time: number) {
    this.vibration.vibrate(time);
  }

  outTotalCalc() {
    this.outTotal = this.outData.malechild + this.outData.maleyoung + this.outData.maleman + this.outData.maleelder + this.outData.femalechild + this.outData.femaleyoung + this.outData.femalewoman + this.outData.femaleelder;
  }

  inTotalCalc() {
    this.inTotal = this.inData.malechild + this.inData.maleyoung + this.inData.maleman + this.inData.maleelder + this.inData.femalechild + this.inData.femaleyoung + this.inData.femalewoman + this.inData.femaleelder;
  }

  dataEnterFinshed(){
    let confirm = this.alertCtrl.create({
      title: 'තහවුරු කරන්න',
      message: 'ඇතුල්වීම් හා පිටවීම් දත්ත ඇතුලත් කිරීම අවසන්',
      buttons: [
        {
          text: 'ආපසු',
          handler: () => {

          }
        },
        {
          text: 'ඔව්',
          handler: () => {
            this.navCtrl.push(EndBusHaltPage,{
              journeyId: this.journeyId,
              location: this.location,
              timeStamp: this.timeStamp,
              outData: this.outData,
              inData: this.inData,
              outTotal: this.outTotal,
              inTotal: this.inTotal,
              nic: this.nic
            });
          }
        }
      ]
    });
    confirm.present();
  }

  goBack(){
    this.navCtrl.push(NewBusHaltPage,{
     journeyId: this.journeyId,
     timeStamp: this.timeStamp,
     nic: this.nic
    });
  }

}
