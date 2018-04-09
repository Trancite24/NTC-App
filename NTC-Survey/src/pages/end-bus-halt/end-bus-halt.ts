import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {NewBusHaltPage} from "../new-bus-halt/new-bus-halt";
import {Toast} from '@ionic-native/toast';
import {v4} from 'uuid';

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
  outData: any;
  inData: any;
  outTotal: any;
  inTotal: any;
  routeNo: string;
  heading: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast
  ) {
    console.log(this.navParams.get('outData'));
    console.log(this.navParams.get('inData'));
    console.log(this.navParams.get('outTotal'));
    console.log(this.navParams.get('inTotal'));
    this.journeyId = this.navParams.get('journeyId');
    this.location = this.navParams.get('location');
    this.outData = this.navParams.get('outData');
    this.inData = this.navParams.get('inData');
    this.outTotal = this.navParams.get('outTotal');
    this.inTotal = this.navParams.get('inTotal');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndBusHaltPage');
    this.getRouteInfo();
  }

  getRouteInfo() {
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location: 'default'
      }
    ).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM journey WHERE journeyId=' + '\"' + this.journeyId + '\"', {})
        .then((res) => {
          if (res.rows.length > 0) {
            this.routeNo = res.rows.item(0).routeNo;
            this.heading = res.rows.item(0).heading;
          }
        })
    }).catch(

    )
  }

  finishClicked() {
    this.inserDataToLocalDB();
    this.insertToLocalTable();
    this.navCtrl.push(NewBusHaltPage);
  }

  inserDataToLocalDB() {
    this.createTable();
  }

  createTable() {
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location: 'default'
      }
    ).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS busstop(busstopId TEXT PRIMARY KEY, journeyId TEXT, lat TEXT, lon TEXT, maleChildOut INTEGER DEFAULT 0, maleYoungOut INTEGER DEFAULT 0, maleManOut INTEGER DEFAULT 0, maleElderOut INTEGER DEFAULT 0, femaleChildOut INTEGER DEFAULT 0, femaleYoungOut INTEGER DEFAULT 0, femaleWomanOut INTEGER DEFAULT 0, femaleElderOut INTEGER DEFAULT 0, maleChildIn INTEGER DEFAULT 0, maleYoungIn INTEGER DEFAULT 0, maleManIn INTEGER DEFAULT 0, maleElderIn INTEGER DEFAULT 0, femaleChildIn INTEGER DEFAULT 0, femaleYoungIn INTEGER DEFAULT 0, femaleWomanIn INTEGER DEFAULT 0, femaleElderIn INTEGER DEFAULT 0, outTotal INTEGER DEFAULT 0, inTotal INTEGER DEFAULT 0)', {})
        .then((res) => {
          console.log('Executed SQL');

        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  insertToLocalTable(){
    const busHaltId = v4();
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then( (db: SQLiteObject) => {
      db.executeSql('INSERT INTO busstop VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          busHaltId,
          this.journeyId,
          this.location.latitude,
          this.location.longitude,
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
          this.inTotal
        ]
      )
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {

            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e+' error', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(

    )
  }

}
