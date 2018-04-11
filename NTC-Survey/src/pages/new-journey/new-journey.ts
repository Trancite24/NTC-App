import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NewBusHaltPage} from '../new-bus-halt/new-bus-halt';
import {SyncLaterPage} from '../sync-later/sync-later';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {v4} from 'uuid';

/**
 * Generated class for the NewJourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-journey',
  templateUrl: 'new-journey.html',
})
export class NewJourneyPage {

  journeis: any = [];
  data = {
    date: '',
    routeNo: '',
    routeName: '',
    heading: '',
    door: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast
  ) {

  }

  ionViewDidLoad() {
    this.createJourneyTable();
  }

  createJourneyTable() {
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location: 'default'
      }
    ).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS journey(journeyId TEXT PRIMARY KEY, date TEXT, routeNo TEXT, routeName TEXT, heading TEXT, door TEXT, synced INTEGER DEFAULT 0)', {})
        .then((res) => console.log('Executed query create table journey'))
        .catch((err) => console.log(err));
    });

  }

  insertJourneyDetails() {
    if (this.data.date === '' || this.data.routeNo === '' || this.data.routeName === '' || this.data.heading === '' || this.data.door === '') {
      this.toast.show('දත්ත සියල්ල නිසියාකාරව ඇතුල් කරන්න!', '2000', 'center').subscribe(
        toast => {


        }
      );

    } else {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        const uuid = v4();
        db.executeSql('INSERT INTO journey VALUES(?,?,?,?,?,?,?)', [uuid, this.data.date, this.data.routeNo, this.data.routeName, this.data.heading, this.data.door, 0])
          .then(res => {
            console.log(res);
            this.toast.show('චාරිකාවේ දත්ත සටහන් කරගන්නා ලදී', '2000', 'center').subscribe(
              toast => {


              }
            );
            setTimeout(() => {
                this.navCtrl.push(NewBusHaltPage, {journeyId: uuid});
              }
              , 2000);
          })
          .catch(e => {
            console.log(e);
            this.toast.show('චාරිකාවේ දත්ත සටහන් කරගැනීම අසාර්ථකයි, නැවත උත්සහ කරන්න', '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });

      }).catch(e => {
        console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }


  }

  pushToSyncLater() {
    this.navCtrl.push(SyncLaterPage);
  }

}
