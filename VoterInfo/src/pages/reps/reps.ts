import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepDetailPage } from '../rep-detail/rep-detail';
import { Http, Headers } from '@angular/http';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.reps = navParams.data.data;
    console.log("on reps list page");
    console.log(this.reps);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepsPage');
  }

  goToRepDetail(rep) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      repName: rep.name
    };

    let posts = [];

    this.http.post('http://localhost:8080/commentsCandidate', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
      posts = res.json();
      this.navCtrl.push(RepDetailPage, {
        rep: rep,
        posts: posts
      });

    }, (err) => {
      console.error(err);
    })


  }

}
