import {Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {Geolocation} from '@ionic-native/geolocation';
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

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    private geoLocation: Geolocation,
    private syncer: SyncerProvider
  ) {
    this.journeyId = this.navParams.get('journeyId');
  }

  ionViewDidLoad() {
    this.loadBusStopDta();
    this.loadJourneyData();
  }

  async getGoeLocation() {
    let loader = this.loadingCtrl.create({
      content: "GPS දත්ත ලබාගනිමින් සිටී..",
    });
    loader.present();
    await this.platform.ready();
    await this.geoLocation.getCurrentPosition({timeout: 60000, enableHighAccuracy: true}).then(async (res) => {
      this.location.longitude = res.coords.longitude;
      this.location.latitude = res.coords.latitude;
      loader.dismiss();
      await this.toast.show('දත්ත ලබාගැනීම සාර්ථකයි', '2000', 'center').subscribe(
        (toast) => {

        }
      );
      setTimeout(() => {
        this.navCtrl.push(GetDownPage, {journeyId: this.journeyId, location: this.location});
      }, 2100);

    }).catch(async (err) => {
      loader.dismiss();
      await this.toast.show('දත්ත ලබාගැනීම අසාර්ථකයි,\n' +
        'GPS දත්ත නොමැතිව ඉදිරියට යෑම', '5000', 'center').subscribe(
        (toast) => {

        }
      );
      setTimeout(() => {
        this.navCtrl.push(GetDownPage, {journeyId: this.journeyId, location: this.location});
      }, 5000);


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
    let loader = this.loadingCtrl.create({
      content: "ප්‍රධාන පද්ධතිය සමග යාවත්කාලීන කිරීම සිදුවෙමින් පවතීී..",
    });
    loader.present();
    await this.busStopRequest().then(
      async (res) => {
        await this.journeyRequest().then(
          (resp) => {
            this.toast.show('සාර්ථකයි!', '3000', 'center').subscribe(
              (toast) => {

              }
            );
            setTimeout(() => {
              this.navCtrl.push(NewJourneyPage);
            }, 3100);
          },
          (error) => {
            this.toast.show('යාවත්කාලීන කිරීම අසාර්ථකයි, ඔබට මෙම දත්ත පසුව ඇතුලත් කල හැකිය', '3000', 'center').subscribe(
              (toast) => {

              }
            );
            setTimeout(() => {
              this.navCtrl.push(NewJourneyPage);
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
          this.navCtrl.push(NewJourneyPage);
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
