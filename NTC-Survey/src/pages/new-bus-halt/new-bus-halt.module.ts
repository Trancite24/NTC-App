import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBusHaltPage } from './new-bus-halt';

@NgModule({
  declarations: [
    NewBusHaltPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBusHaltPage),
  ],
})
export class NewBusHaltPageModule {}
