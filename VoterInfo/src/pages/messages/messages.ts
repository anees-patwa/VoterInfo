import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { httpFactory } from '@angular/http/src/http_module';
import { Http, Headers } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';

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
  messages: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private http: Http, private global: GlobalProvider) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      userFrom: global.globalUser
    }

    this.http.post('http://localhost:8080/messageList', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log("response after asking for message overview", res.json());



    }, (err) => {
      console.error(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }




}
