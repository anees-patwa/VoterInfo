import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvoPage } from './convo';

@NgModule({
  declarations: [
    ConvoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConvoPage),
  ],
})
export class ConvoPageModule {}
