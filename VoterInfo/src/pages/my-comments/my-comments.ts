import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the MyCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-comments',
  templateUrl: 'my-comments.html',
})
export class MyCommentsPage {
  username: String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCommentsPage');
  }

 
}
