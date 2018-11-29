import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepDetailPage } from './rep-detail';

@NgModule({
  declarations: [
    RepDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RepDetailPage),
  ],
})
export class RepDetailPageModule {}
