import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';


import {SQLiteObject, SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';

import {SyncerProvider} from '../../providers/syncer/syncer';

/**
 * Generated class for the SyncLaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sync-later',
  templateUrl: 'sync-later.html',
})
export class SyncLaterPage {

  unSyncedJourney: any = [];
  unSyncedBusStop: any = [];
  allUpdated = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private sqlite: SQLite,
    private toast: Toast,
    private syncer: SyncerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SyncLaterPage');
    this.loadUnSyncedJournies();

  }

  loadUnSyncedJournies() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM journey WHERE synced=0', {})
        .then((res) => {
          this.unSyncedJourney = [];
          if (res.rows.length === 0){
            this.allUpdated = true;
            this.toast.show('සියළු දත්ත යාවත්කාලීනයි!', '5000', 'center').subscribe(
              (toast) => {

              }
            );
          }

            for (let i = 0; i < res.rows.length; i++) {
              this.unSyncedJourney[i] = res.rows.item(i);

            }

        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            (toast) => {

            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        (toast) => {

        }
      );
    });


  }

  async syncLater() {
    await this.loadUnSyncedBusStopData();
    this.syncNow().then(
      (res) => {
        this.loadUnSyncedJournies();
      }
    ).catch(
      (e) => {
        this.toast.show(e, '5000', 'center').subscribe(
          (toast) => {

          }
        );
      }
    );

    /*
        setTimeout(
          () => {
            let journies = [];
            journies = this.unSyncedJourney;
            journies.forEach((journey) => {
              this.updateJourneySyncStatus(journey);

            });
          }, 2000);

        setTimeout(() => {
          this.updateBusStopSyncStatus(this.unSyncedBusStop);
          this.toast.show(JSON.parse(this.unSyncedBusStop), '5000', 'center').subscribe(
            (toast) => {

            }
          );
        }, 2000);*/


  }

  loadUnSyncedBusStopData() {
    return new Promise((resolve, reject) => {
      let journies = [];
      journies = this.unSyncedJourney;
      this.unSyncedBusStop = [];


          this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('SELECT * FROM busstop WHERE synced=0', {})
              .then(res => {

                for (let i = 0; i < res.rows.length; i++) {
                  this.unSyncedBusStop.push(res.rows.item(i));
                }
                resolve(res);
              })
              .catch(e => {
                console.log(e);
                reject(e)
              });

          }).catch(e => {
            console.log(e);
            reject(e)
          });


    });


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
          },
          (error) => {
            this.toast.show('යාවත්කාලීන කිරීම අසාර්ථකයි', '3000', 'center').subscribe(
              (toast) => {

              }
            );
          }
        )
      },
      (err) => {
        this.toast.show('යාවත්කාලීන කිරීම අසාර්ථකයි', '3000', 'center').subscribe(
          (toast) => {


          }
        );
      }
    );

    loader.dismiss();

  }

  busStopRequest() {
    return new Promise((resolve, reject) => {
      this.syncer.syncNowBusStop(this.unSyncedBusStop).subscribe(
        (res) => {
          resolve(res);
          this.updateBusStopSyncStatus(this.unSyncedBusStop);

        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  journeyRequest() {
    return new Promise((resolve, reject) => {
      let journies = [];
      journies = this.unSyncedJourney;
      journies.forEach(
        (journey) => {
          this.syncer.syncNowJourney(journey).subscribe(
            (res) => {

              this.updateJourneySyncStatus(this.unSyncedJourney);
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
      );


    });
  }

  updateBusStopSyncStatus(busStopData: any) {
    let busStopDataArr = [];
    busStopDataArr = this.unSyncedBusStop;
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
    let journeyDataArr;
    journeyDataArr = this.unSyncedJourney;
    journeyDataArr.forEach(
      (journey) => {
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then(
          (db: SQLiteObject) => {
            db.executeSql('UPDATE journey SET synced=? WHERE journeyId=?', [1, journey.journeyId])
              .then((res) => {

              })
              .catch(e => console.log(e));
          }
        );
      }
    );

  }
}
