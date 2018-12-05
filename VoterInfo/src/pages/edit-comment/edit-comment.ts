import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http, Headers } from '@angular/http';
import { MyCommentsPage } from '../my-comments/my-comments';
/**
 * Generated class for the EditCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-comment',
  templateUrl: 'edit-comment.html',
})
export class EditCommentPage {
  comments: any[];
  id: any;
  candidate: any;
  description: any;
  title: any;
  username: any;
  likes: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, global: GlobalProvider, public http: Http) {
    this.id = navParams.get('id');
    this.candidate = navParams.get('candidate');
    this.username = navParams.get('username');
    this.title =  navParams.get('title');
    this.likes =  navParams.get('likes');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCommentPage');
  }

  editComment(){
    
    let headers = new Headers();
  
    headers.append('Content-Type', 'application/json');

    let data = {
      id: this.id,
      username: this.username,
      candidate: this.candidate,
      title: this.title,
      description: this.description,
      likes: this.likes
    };
    this.http.post('http://localhost:8080/edit', JSON.stringify(data), { headers: headers }).subscribe((res) => {

      data.candidate = res.json().candidate;
      data.title = res.json().title;
      data.likes = res.json().likes;
      console.log(data);
      // this.comments = res.json();
      // this.comments.push(data);
    }, (err) => {
      console.error(err);
    })
    // alert(data.description);
    this.navCtrl.pop();
    
    // document.getElementById('editForm').style.display = "none";
  }

  logOut(){
    window.location.reload();
  }

}
