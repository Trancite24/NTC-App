import {Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {Geolocation} from '@ionic-native/geolocation';
import {GetDownPage} from '../get-down/get-down';
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
  testData: any = [];

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
    this.loadDb();
  }

  async getGoeLocation() {
    let loader = this.loadingCtrl.create({
      content: "GPS දත්ත ලබාගනිමින් සිටී..",
    });
    loader.present();
    await this.platform.ready();
    await this.geoLocation.getCurrentPosition({timeout: 60000}).then(async (res) => {
      this.location.longitude = res.coords.longitude;
      this.location.latitude = res.coords.latitude;
      loader.dismiss();
      await this.toast.show('දත්ත ලබාගැනීම සාර්ථකයි' + this.location.latitude, '3000', 'center').subscribe(
        (toast) => {

        }
      );
      setTimeout(() => {
        this.navCtrl.push(GetDownPage, {journeyId: this.journeyId, location: this.location});
      }, 3500);


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

  loadDb() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(
      (db: SQLiteObject) => {
        db.executeSql('SELECT * FROM busstop', {})
          .then((res) => {
            for (let i = 0; i < res.rows.length; i++) {
              this.testData.push(res.rows.item(i));
            }
          })
          .catch(e => console.log(e));
      }
    );
  }

  syncNow() {

    this.syncer.syncNowBusStop(this.testData).subscribe(
      (res) => {
        this.toast.show('සාර්ථකයි', '3000', 'center').subscribe(
          (toast) => {

          }
        );
      },
      (err) => {
        this.toast.show('in god we trust', '3000', 'center').subscribe(
          (toast) => {

          }
        );
      }
    );
  }
}
