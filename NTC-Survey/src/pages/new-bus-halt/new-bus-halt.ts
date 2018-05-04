import {Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {Geolocation} from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import {GetDownPage} from '../get-down/get-down';
import {NewJourneyPage} from '../new-journey/new-journey';
import {SyncerProvider} from '../../providers/syncer/syncer';

/**
 * Generated class for the NewBusHaltPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-bus-halt',
  templateUrl: 'new-bus-halt.html',
})
export class NewBusHaltPage {

  location: any = {longitude: 0.0, latitude: 0.0};
  journies: any = [];
  journeyId: string;
  busStopData: any = [];
  journey: any;
  nic: string;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    private geoLocation: Geolocation,
    private diagnostic: Diagnostic,
    private syncer: SyncerProvider,
    private alertCtrl: AlertController,
    private locationAccuracy: LocationAccuracy
  ) {
    this.journeyId = this.navParams.get('journeyId');
    this.nic = this.navParams.get('nic');
  }

  ionViewDidLoad() {
    this.loadBusStopDta();
    this.loadJourneyData();
    this.enableHighAccuracyLocationMethod();
    /*this.diagnostic.isGpsLocationEnabled().then(
      (enabled) =>{
        this.toast.show('GPS '+(enabled ? 'enabled' : 'disabled'), '5000', 'center').subscribe(
          (toast) => {

          }
        );
      }
    ).catch(
      (err) => {
        this.toast.show('Error!', '5000', 'center').subscribe(
          (toast) => {

          }
        );
      }
    )*/
  }

  enableHighAccuracyLocationMethod(){
    this.locationAccuracy.canRequest().then(
      (canRequest: boolean) => {
        if(canRequest){
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => console.log('Request successful'),
            error => {
              this.diagnostic.switchToLocationSettings();
            }
          );
        }
      }
    );
  }

  async getGoeLocation() {
    let loader = this.loadingCtrl.create({
      content: "GPS දත්ත ලබාගනිමින් සිටී..",
    });
    loader.present();
    await this.platform.ready();
    await this.geoLocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: true}).then(async (res) => {
      this.location.longitude = res.coords.longitude;
      this.location.latitude = res.coords.latitude;
      loader.dismiss();
      await this.toast.show('දත්ත ලබාගැනීම සාර්ථකයි', '1000', 'center').subscribe(
        (toast) => {

        }
      );
      setTimeout(() => {
        let timeStamp = new Date().getTime().toString();
        this.navCtrl.push(GetDownPage, {journeyId: this.journeyId, location: this.location, timeStamp: timeStamp, nic: this.nic});
      }, 1000);

    }).catch(async (err) => {
      loader.dismiss();
      await this.toast.show('දත්ත ලබාගැනීම අසාර්ථකයි,\n' +
        'GPS දත්ත නොමැතිව ඉදිරියට යෑම', '3000', 'center').subscribe(
        (toast) => {

        }
      );
      setTimeout(() => {
        let timeStamp = new Date().getTime().toString();
        this.navCtrl.push(GetDownPage, {journeyId: this.journeyId, location: this.location, timeStamp: timeStamp, nic: this.nic});
      }, 3000);


    });

  }

  loadBusStopDta() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(
      (db: SQLiteObject) => {
        db.executeSql('SELECT * FROM busstop WHERE journeyId=' + '\"' + this.journeyId + '\"' + 'AND synced=0', {})
          .then((res) => {
            for (let i = 0; i < res.rows.length; i++) {
              this.busStopData.push(res.rows.item(i));
            }
          })
          .catch(e => console.log(e));
      }
    );
  }

  loadJourneyData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(
      (db: SQLiteObject) => {
        db.executeSql('SELECT * FROM journey WHERE journeyId=' + '\"' + this.journeyId + '\"' + 'AND synced=0', {})
          .then((res) => {
            if (res.rows.length > 0)
              this.journey = res.rows.item(0);
          })
          .catch(e => console.log(e));
      }
    );
  }

  async syncNow() {
    let confirm = this.alertCtrl.create({
      title: 'තහවුරු කරන්න',
      message: 'චාරිකාව අවසාන කරන්නේද?',
      buttons: [
        {
          text: 'ආපසු',
          handler: () => {

          }
        },
        {
          text: 'ඔව්',
          handler: () => {
           this.yesSelected();
          }
        }
      ]
    });
    confirm.present();


  }

  async yesSelected(){
    let loader = this.loadingCtrl.create({
      content: "ප්‍රධාන පද්ධතිය සමග යාවත්කාලීන කිරීම සිදුවෙමින් පවතීී..",
    });
    loader.present();


    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(
      (db: SQLiteObject) => {
        db.executeSql('UPDATE journey SET ongoing=? WHERE journeyId=?', [0, this.journeyId])
          .then((res) => {

          })
          .catch(e => {
            console.log(e);
            this.toast.show(e.message, '5000', 'center').subscribe(
              (toast) => {

              }
            );
          });
      }
    );
    await this.busStopRequest().then(


      async (res) => {
        await this.journeyRequest().then(

          (resp) => {

            this.toast.show('සාර්ථකයි!', '3000', 'center').subscribe(
              (toast) => {

              }
            );
            setTimeout(() => {
              this.navCtrl.push(NewJourneyPage, {nic: this.nic});
            }, 3100);
          },
          (error) => {
            this.toast.show('යාවත්කාලීන කිරීම අසාර්ථකයි, ඔබට මෙම දත්ත පසුව ඇතුලත් කල හැකිය', '3000', 'center').subscribe(
              (toast) => {

              }
            );
            setTimeout(() => {
              this.navCtrl.push(NewJourneyPage, {nic: this.nic});
            }, 3100);
          }
        )
      },
      (err) => {
        this.toast.show('යාවත්කාලීන කිරීම අසාර්ථකයි, ඔබට මෙම දත්ත පසුව ඇතුලත් කල හැකිය', '3000', 'center').subscribe(
          (toast) => {


          }
        );
        setTimeout(() => {
          this.navCtrl.push(NewJourneyPage, {nic: this.nic});
        }, 3100);
      }
    );

    loader.dismiss();

  }

  busStopRequest() {
    return new Promise((resolve, reject) => {
      this.syncer.syncNowBusStop(this.busStopData).subscribe(
        (res) => {

          this.updateBusStopSyncStatus(this.busStopData);
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  journeyRequest() {
    return new Promise((resolve, reject) => {
      this.syncer.syncNowJourney(this.journey).subscribe(
        (res) => {

          this.updateJourneySyncStatus(this.journey);
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateBusStopSyncStatus(busStopData: any) {
    let busStopDataArr = [];
    busStopDataArr = busStopData;
    busStopDataArr.forEach(
      (busStop) => {
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then(
          (db: SQLiteObject) => {
            db.executeSql('UPDATE busstop SET synced=? WHERE busstopId=?', [1, busStop.busstopId])
              .then((res) => {

              })
              .catch(e => console.log(e));
          }
        );
      }
    );

  }

  updateJourneySyncStatus(journeyData: any) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(
      (db: SQLiteObject) => {
        db.executeSql('UPDATE journey SET synced=? WHERE journeyId=?', [1, journeyData.journeyId])
          .then((res) => {

          })
          .catch(e => console.log(e));
      }
    );
  }


}
