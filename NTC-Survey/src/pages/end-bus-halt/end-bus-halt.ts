import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {NewBusHaltPage} from "../new-bus-halt/new-bus-halt";
import {Toast} from '@ionic-native/toast';
import {v4} from 'uuid';
import {SyncerProvider} from "../../providers/syncer/syncer";

/**
 * Generated class for the EndBusHaltPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-end-bus-halt',
  templateUrl: 'end-bus-halt.html',
})
export class EndBusHaltPage {

  journeyId: string;
  location: any;
  timeStamp: string;
  name: string = ' ';
  outData: any;
  inData: any;
  outTotal: any;
  inTotal: any;
  busStopType: string = '';
  routeNo: string;
  heading: string;
  cities: any [];
  BRsNotVisible = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    private syncer: SyncerProvider
  ) {
    console.log(this.navParams.get('outData'));
    console.log(this.navParams.get('inData'));
    console.log(this.navParams.get('outTotal'));
    console.log(this.navParams.get('inTotal'));
    this.journeyId = this.navParams.get('journeyId');
    this.location = this.navParams.get('location');
    this.timeStamp = this.navParams.get('timeStamp');
    this.outData = this.navParams.get('outData');
    this.inData = this.navParams.get('inData');
    this.outTotal = this.navParams.get('outTotal');
    this.inTotal = this.navParams.get('inTotal');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndBusHaltPage');

  }


  finishClicked() {
    if (this.busStopType === '') {
      this.toast.show('බස් නැවතුම් වර්ගය තෝරන්න!', '2000', 'center').subscribe(
        toast => {

        }
      );
    }
    else {
      /*this.inserDataToLocalDB();*/
      this.insertToLocalTable();
      this.toast.show('සාර්ථකයි! ඊලග නැවතුමට..','1000','center').subscribe(
        (toast) => {

        }
      );
      this.navCtrl.push(NewBusHaltPage, {journeyId: this.journeyId});
    }

  }

  /*inserDataToLocalDB() {
    this.createTable();
  }

  createTable() {
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
  */

  insertToLocalTable() {
    const busHaltId = v4();
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO busstop VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          busHaltId,
          this.journeyId,
          this.location.latitude,
          this.location.longitude,
          this.name,
          this.timeStamp,
          this.outData.malechild,
          this.outData.maleyoung,
          this.outData.maleman,
          this.outData.maleelder,
          this.outData.femalechild,
          this.outData.femaleyoung,
          this.outData.femalewoman,
          this.outData.femaleelder,
          this.inData.malechild,
          this.inData.maleyoung,
          this.inData.maleman,
          this.inData.maleelder,
          this.inData.femalechild,
          this.inData.femaleyoung,
          this.inData.femalewoman,
          this.inData.femaleelder,
          this.outTotal,
          this.inTotal,
          this.busStopType,
          0
        ]
      )
        .then(res => {
          console.log(res);

        })
        .catch(e => {
          console.log(e);
          this.toast.show(e.message + ' error', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(

    )
  }

  test(event: any) {
    this.syncer.test(this.name, this.location).subscribe(
      (res) => {
        console.log(res.predictions);
        if (res.predictions.length > 4){
          this.cities = res.predictions;
          this.BRsNotVisible = true;
        }


      },
      (err) => {
        console.log(err);
      }
    );
    console.log(event);

  }

  setName(name: string) {
    this.BRsNotVisible = false;
    this.cities = [];
    this.name = name.replace(',', '').replace('Sri Lanka', '').replace(',', '');

  }

}
