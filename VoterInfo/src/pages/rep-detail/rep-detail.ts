import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rep-detail',
  templateUrl: 'rep-detail.html',
})
export class RepDetailPage {
  rep: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rep = navParams.data;
    console.log(this.rep);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepDetailPage');
  }

}
