import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
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
    fromName: '',
    toName: '',
    door: '',
    numberOfSeats: '',
  };
  nic: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast
  ) {
    this.data.date = new Date().toLocaleDateString('en-GB');
    this.nic = this.navParams.get('nic');
  }

  ionViewDidLoad() {
    this.createJourneyTable();
    this.createBusStopTable();
  }


  createJourneyTable() {
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location: 'default'
      }
    ).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS journey(journeyId TEXT PRIMARY KEY, nic TEXT, date TEXT, routeNo TEXT, fromName TEXT, toName TEXT, door TEXT, numberOfSeats INTEGER DEFAULT 0, synced INTEGER DEFAULT 0)', {})
        .then((res) => console.log('Executed query create table journey'))
        .catch((err) => {
          this.toast.show(' ' + err.message, '7000', 'center').subscribe(
            toast => {


            }
          );
        });
    });

  }

  createBusStopTable() {
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location: 'default'
      }
    ).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS busstop(busstopId TEXT PRIMARY KEY, journeyId TEXT, lat TEXT, lon TEXT, name TEXT, timeStamp TEXT, maleChildOut INTEGER DEFAULT 0, maleYoungOut INTEGER DEFAULT 0, maleManOut INTEGER DEFAULT 0, maleElderOut INTEGER DEFAULT 0, femaleChildOut INTEGER DEFAULT 0, femaleYoungOut INTEGER DEFAULT 0, femaleWomanOut INTEGER DEFAULT 0, femaleElderOut INTEGER DEFAULT 0, maleChildIn INTEGER DEFAULT 0, maleYoungIn INTEGER DEFAULT 0, maleManIn INTEGER DEFAULT 0, maleElderIn INTEGER DEFAULT 0, femaleChildIn INTEGER DEFAULT 0, femaleYoungIn INTEGER DEFAULT 0, femaleWomanIn INTEGER DEFAULT 0, femaleElderIn INTEGER DEFAULT 0, outTotal INTEGER DEFAULT 0, inTotal INTEGER DEFAULT 0, synced INTEGER DEFAULT 0)', {})
        .then((res) => {
          console.log('Executed SQL');

        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  insertJourneyDetails() {
    if (this.data.date === '' || this.data.routeNo === '' || this.data.fromName === '' || this.data.toName === '' || this.data.door === '' || Number(this.data.numberOfSeats) < 7) {
      this.toast.show('දත්ත සියල්ල නිසියාකාරව ඇතුල් කරන්න!', '2000', 'center').subscribe(
        toast => {


        }
      );

    } else {

      let confirm = this.alertCtrl.create({
        title: 'තහවුරු කරන්න',
        message: 'මෙම දත්ත නැවත වෙනස් කල නොහැක, තහවුරු කරන්නේද?',
        buttons: [
          {
            text: 'ආපසු',
            handler: () => {

            }
          },
          {
            text: 'ඔව්',
            handler: () => {
              this.updateLocalDBTable();
            }
          }
        ]
      });
      confirm.present();


    }


  }


  updateLocalDBTable() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      const uuid = v4();
      db.executeSql('INSERT INTO journey VALUES(?,?,?,?,?,?,?,?,?)', [uuid, this.nic, this.data.date, this.data.routeNo, this.data.fromName, this.data.toName, this.data.door, Number(this.data.numberOfSeats), 0])
        .then(res => {
          console.log(res);
          this.toast.show('චාරිකාවේ දත්ත සටහන් කරගන්නා ලදී', '4000', 'center').subscribe(
            toast => {


            }
          );
          setTimeout(() => {
              this.navCtrl.push(NewBusHaltPage, {journeyId: uuid});
            }
            , 4000);
        })
        .catch(e => {
          console.log(e);
          this.toast.show('චාරිකාවේ දත්ත සටහන් කරගැනීම අසාර්ථකයි, නැවත උත්සහ කරන්න' + e.message, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });

    }).catch(e => {
      console.log(e);
      this.toast.show(e.toString(), '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  pushToSyncLater() {
    this.navCtrl.push(SyncLaterPage);
  }

}
