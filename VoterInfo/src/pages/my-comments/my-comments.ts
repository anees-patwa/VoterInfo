import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the MyCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-comments',
  templateUrl: 'my-comments.html'
})
export class MyCommentsPage {
  username: String;
  candidate: String;
  comments: any[];
  title: any;
  description: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public http: Http) {
  
  }

  ionViewDidLoad() {
    let username = this.global.globalUser;
    // alert(username);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      username: username,
    };

    
    this.http.post('http://localhost:8080/my-comments', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
      this.comments = res.json();
    }, (err) => {
      console.error(err);
    })
  }
 
}
