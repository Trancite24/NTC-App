import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SyncLaterPage } from './sync-later';

@NgModule({
  declarations: [
    SyncLaterPage,
  ],
  imports: [
    IonicPageModule.forChild(SyncLaterPage),
  ],
})
export class SyncLaterPageModule {}
