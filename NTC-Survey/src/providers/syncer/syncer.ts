import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

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

  syncNowBusStop(data: any) {
    return this.http.post<any>('https://u7qprbx4wg.execute-api.us-east-1.amazonaws.com/production/insertintobusstoptable', data);
  }

  syncNowJourney(data: any) {
    return this.http.post<any>('https://u7qprbx4wg.execute-api.us-east-1.amazonaws.com/production/insertintojourneytable', data);
  }

  syncLater() {

  }

  test(input: string, location: any) {
 //   return this.http.get<any>('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&types=geocode&components=country:lk&location='+location.latitude+','+location.longitude+'&radius=500&key=AIzaSyCaTPNS8M61OHndMio7tOcCus_Ku9r9dmo');
    return this.http.get<any>('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&types=geocode&components=country:lk&key=AIzaSyCaTPNS8M61OHndMio7tOcCus_Ku9r9dmo');

  }

}
