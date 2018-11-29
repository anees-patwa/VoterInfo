import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepsPage } from './reps';

@NgModule({
  declarations: [
    RepsPage,
  ],
  imports: [
    IonicPageModule.forChild(RepsPage),
  ],
})
export class RepsPageModule {}
