import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { NewMessagePage } from '../new-message/new-message';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the ConvoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-convo',
  templateUrl: 'convo.html',
})
export class ConvoPage {
  userTo: any;
  messages: any[];
  userFrom: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private global: GlobalProvider, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConvoPage');
  }

  ionViewWillEnter() {
    this.userTo = this.navParams.data.userTo;
    //this.messages = this.navParams.data.messages;
    console.log(this.messages);
    this.userFrom = this.global.globalUser;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userFrom: this.global.globalUser,
      userTo: this.userTo
    }

    this.http.post('http://localhost:8080/getMessages', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
      this.messages = res.json();

    })
  }

  sendMessage(userTo) {

    //console.log(name);
    this.navCtrl.push(NewMessagePage, {
      name: userTo
    })

  }

}
