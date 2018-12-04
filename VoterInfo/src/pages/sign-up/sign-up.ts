import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { GlobalProvider } from "../../providers/global/global";
import { MessagesPage } from '../messages/messages';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',

})


export class SignUpPage {
  username: any;
  password: any;
  isRep: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider) {
  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  login() {
    //console.log(data);

    let data = {
      username: this.username,
      password: this.password
    };
    console.log(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.global.globalUser = this.username;
    this.global.globalIsRep = this.isRep;

    this.http.post('http://localhost:8080/login', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        console.log(res.json());
        if (this.isRep) {
          this.navCtrl.push(MessagesPage);
        } else {
          this.navCtrl.push(TabsPage, {
            username: this.username
          });
        }

      });



  }

  createAccount() {
    //console.log(data);
    let data = {
      username: this.username,
      password: this.password
    };
    console.log(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.global.globalUser = this.username;
    this.global.globalIsRep = this.isRep;

    this.http.post('http://localhost:8080/signup', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res);
      if (this.isRep) {
        this.navCtrl.push(MessagesPage);
      } else {
        this.navCtrl.push(TabsPage, {
          username: this.username
        });
      }

    }, (err) => console.log(err));

  }
}
