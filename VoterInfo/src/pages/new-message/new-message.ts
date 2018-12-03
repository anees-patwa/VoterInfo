import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';


/**
 * Generated class for the NewMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html',
})
export class NewMessagePage {
  userTo: any;
  message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private global: GlobalProvider) {
    this.userTo = this.navParams.data.name;
    console.log(this.userTo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMessagePage');
  }

  sendMessage() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userTo: this.userTo,
      userFrom: this.global.globalUser,
      message: this.message
    }

    this.http.post("http://localhost:8080/sentMessage", JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
      this.navCtrl.pop();
    }, (err) => {
      console.error(err);
    })
  }

}
