import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCommentsPage } from './my-comments';

@NgModule({
  declarations: [
    MyCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCommentsPage),
  ],
})
export class MyCommentsPageModule {}
