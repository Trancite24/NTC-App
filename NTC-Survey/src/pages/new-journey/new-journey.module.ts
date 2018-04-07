import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewJourneyPage } from './new-journey';

@NgModule({
  declarations: [
    NewJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(NewJourneyPage),
  ],
})
export class NewJourneyPageModule {}
