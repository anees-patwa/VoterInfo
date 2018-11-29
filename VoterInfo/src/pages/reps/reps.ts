import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepDetailPage } from '../rep-detail/rep-detail';

/**
 * Generated class for the RepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reps',
  templateUrl: 'reps.html',
})
export class RepsPage {
  reps: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reps = navParams.data.data;
    console.log("on reps list page");
    console.log(this.reps);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepsPage');
  }

  goToRepDetail(rep) {
    this.navCtrl.push(RepDetailPage, rep);
  }

}
