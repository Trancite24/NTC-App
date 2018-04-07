import {Platform} from 'ionic-angular';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import {GetDownPage} from '../get-down/get-down';
import {async} from "rxjs/scheduler/async";


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

  location: any = { longitude: 0.0, latitude: 0.0};
  journies: any = [];
  journeyId: string;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    private geoLocation: Geolocation
  ) {
    this.journeyId = this.navParams.get('journeyId');
  }

  ionViewDidLoad() {
    // this.loadDb();
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
      await this.toast.show('දත්ත ලබාගැනීම සාර්ථකයි' + this.location.latitude, '5000', 'center').subscribe(
        (toast) => {
          this.navCtrl.push(GetDownPage, {journeyId: this.journeyId, location: this.location});
        }
      );


    }).catch(async (err) => {
      loader.dismiss();
      await this.toast.show('දත්ත ලබාගැනීම අසාර්ථකයි,\n' +
        'GPS දත්ත නොමැතිව ඉදිරියට යෑම', '5000', 'center').subscribe(
        (toast) => {
          this.navCtrl.push(GetDownPage, {journeyId: this.journeyId,location: this.location});
        }
      );


    });

  }

  /*loadDb() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then(
      (db: SQLiteObject) => {
        db.executeSql('SELECT * FROM journey', {})
          .then((res) => {
            this.journies = [];
            for (let i = 0; i < res.rows.length; i++) {
              this.journies.push({
                journeyId: res.rows.item(i).journeyId,
                date: res.rows.item(i).date,
                routeNo: res.rows.item(i).routeNo,
                routeName: res.rows.item(i).routeName,
                heading: res.rows.item(i).heading,
                door: res.rows.item(i).door,
                synced: res.rows.item(i).synced
              })
            }
          })
          .catch(e => console.log(e));
      }
    );
  }
*/
}
