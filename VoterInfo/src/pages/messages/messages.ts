import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { httpFactory } from '@angular/http/src/http_module';
import { Http, Headers } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
import { ConvoPage } from '../convo/convo';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  recipients: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private global: GlobalProvider) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userFrom: global.globalUser
    }

    this.http.post('http://localhost:8080/messageList', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log("response after asking for message overview", res.json());

      let temp = res.json();
      console.log(temp);
      //this.recipients = temp;
      let globalUser = this.global.globalUser;

      temp = temp.map(function (val) {
        if (val.userTo == globalUser) {
          return val.userFrom;
        } else {
          return val.userTo;
        }
      });

      let tempSet = new Set(temp);

      this.recipients = Array.from(tempSet);

    }, (err) => {
      console.error(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  ionViewWillEnter() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userFrom: this.global.globalUser
    }

    this.http.post('http://localhost:8080/messageList', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log("response after asking for message overview", res.json());

      let temp = res.json();
      console.log(temp);
      //this.recipients = temp;

      let globalUser = this.global.globalUser;

      temp = temp.map(function (val) {
        if (val.userTo == globalUser) {
          return val.userFrom;
        } else {
          return val.userTo;
        }
      });

      let tempSet = new Set(temp);

      this.recipients = Array.from(tempSet);
      console.log("unique recipients", this.recipients);
    }, (err) => {
      console.error(err);
    })
  }

  convo(recipient) {
    //get all messages
    /*let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userFrom: this.global.globalUser,
      userTo: recipient
    }

    this.http.post('http://localhost:8080/getMessages', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());

      
    })*/

    this.navCtrl.push(ConvoPage, {
      userTo: recipient
    });
    //display detail page
  }

  logOut(){
    window.location.reload();
  }




}
