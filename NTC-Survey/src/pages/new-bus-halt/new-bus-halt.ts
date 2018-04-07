import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';

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

  journies: any = [];
  journeyId :string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast
  ) {
    this.journeyId = this.navParams.get('journeyId');
  }

  ionViewDidLoad() {
    // this.loadDb();
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
