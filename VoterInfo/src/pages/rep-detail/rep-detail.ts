import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Http, Headers } from '@angular/http';

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
  posts: any[];
  title: any;
  description: any;
  inFavor: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public http: Http) {
    this.rep = navParams.data;
    console.log(this.rep);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      repName: this.rep.name
    };

    this.http.post('http://localhost:8080/commentsCandidate', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
      this.posts = res.json();

    }, (err) => {
      console.error(err);
    })


    //get comments for this rep

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepDetailPage');
  }

  submitPost() {
    let username = this.global.globalUser;
    let candidate = this.rep.name;

    let data = {
      owner: username,
      candidate: candidate,
      title: this.title,
      description: this.description,
      inFavor: this.inFavor
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/createComment', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log("response after creating comment", res.json())
      this.posts.push(data);

    }, (err) => {
      console.error(err);
    })

    //append comment to comment list

  }

}
