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
    this.rep = navParams.data.rep;
    console.log(this.rep);

    this.posts = navParams.data.posts;
    console.log("posts", this.posts);




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

  like(id) {
    for (let item of this.posts) {
      if (item._id == id) {
        item.likes += 1;
      }
    }
    let data = {
      id: id
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/likeComment', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log("liking a comment", res);
    })
  }

}
