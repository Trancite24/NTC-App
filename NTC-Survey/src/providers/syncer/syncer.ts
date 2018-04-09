import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SyncerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SyncerProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SyncerProvider Provider');
  }

  syncNowBusStop(data: any){
    return this.http.post<any>('https://8yw1zzliak.execute-api.us-east-1.amazonaws.com/dev/insertintobusstoptable', data);
  }

  syncLater(){

  }
}
