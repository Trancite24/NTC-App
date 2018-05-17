import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Platform} from 'ionic-angular';
import {NewJourneyPage} from '../new-journey/new-journey';
import {NewBusHaltPage} from '../new-bus-halt/new-bus-halt';
import {AlertController} from 'ionic-angular';
import {v4} from 'uuid';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ongoingJourney = {ongoing: 0, journeyId: '', nic: ''};
  loginCredintials = {nic: '', password: '1234'};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private toast: Toast,
    private sqlite: SQLite,
    platform: Platform,
  ) {
    platform.ready().then(() => {
      this.createJourneyTable();
      this.createBusStopTable();

    });
  }

  createJourneyTable() {
    this.sqlite.create(
      {
        name: 'ionicdb.db',
        location: 'default'
      }
    ).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS journey(journeyId TEXT PRIMARY KEY, nic TEXT, date TEXT, routeNo TEXT, fromName TEXT, toName TEXT, door TEXT, numberOfSeats INTEGER DEFAULT 0, synced INTEGER DEFAULT 0, ongoing INTEGER DEFAULT 0)', {})
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
      db.executeSql('CREATE TABLE IF NOT EXISTS busstop(busstopId TEXT PRIMARY KEY, journeyId TEXT, lat TEXT, lon TEXT, name TEXT, timeStamp TEXT, maleChildOut INTEGER DEFAULT 0, maleYoungOut INTEGER DEFAULT 0, maleManOut INTEGER DEFAULT 0, maleElderOut INTEGER DEFAULT 0, femaleChildOut INTEGER DEFAULT 0, femaleYoungOut INTEGER DEFAULT 0, femaleWomanOut INTEGER DEFAULT 0, femaleElderOut INTEGER DEFAULT 0, maleChildIn INTEGER DEFAULT 0, maleYoungIn INTEGER DEFAULT 0, maleManIn INTEGER DEFAULT 0, maleElderIn INTEGER DEFAULT 0, femaleChildIn INTEGER DEFAULT 0, femaleYoungIn INTEGER DEFAULT 0, femaleWomanIn INTEGER DEFAULT 0, femaleElderIn INTEGER DEFAULT 0, outTotal INTEGER DEFAULT 0, inTotal INTEGER DEFAULT 0, busStopType TEXT, synced INTEGER DEFAULT 0)', {})
        .then((res) => {
          console.log('Executed SQL');

        })
        .catch((e) => {
          this.toast.show(e.message, '5000', 'center').subscribe(
            (toast) => {

            }
          );
        });
    });
  }

  checkPreviousJourneyStatus() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then(
        (db: SQLiteObject) => {
          db.executeSql('SELECT * FROM journey WHERE ongoing=1', {})
            .then((res) => {
              if (res.rows.length > 0)
                this.ongoingJourney = res.rows.item(0);
              resolve(res);
            })
            .catch(e => {
              console.log(e);
              this.toast.show(e.message, '5000', 'center').subscribe(
                (toast) => {

                }
              );
              reject(e);
            });
        }
      );
    });


  }

  async login(nic: string, pw: string) {
    await this.checkPreviousJourneyStatus();
    console.log(v4());
    let regExp = /^([0-9]{9,11}[v|V])/;
    if (this.loginCredintials.password === pw && (regExp.test(nic))) {
      if (this.ongoingJourney.ongoing === 1) {
        this.toast.show('පෙර චාරිකාවට නැවතත්..', '3000', 'center').subscribe(
          (toast) => {

          }
        );
        setTimeout(() => {

        }, 3000)
        this.navCtrl.push(NewBusHaltPage, {journeyId: this.ongoingJourney.journeyId, nic: this.ongoingJourney.nic})
      }
      else {
        this.navCtrl.push(NewJourneyPage, {nic: nic});
      }

    }
    else {
      let alert = this.alertCtrl.create({
        title: 'මුරපදය හෝ හැදුනුම්පත් අංකය වැරදියි!',
        subTitle: 'නැවත උත්සහ කරන්න',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
