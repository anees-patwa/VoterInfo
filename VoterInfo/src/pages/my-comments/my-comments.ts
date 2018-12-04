import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http, Headers } from '@angular/http';
import {EditCommentPage} from '../edit-comment/edit-comment';
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
  _id: any;
  likes: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public http: Http) {
    // this.description = navParams.get('description');
  }

  ionViewDidLoad() {
  
    // document.getElementById('editForm').style.display = "none";
  }

  ionViewWillEnter(){
    this.refreshComments();
  }

  deleteComment(id){
    let username = this.global.globalUser;
    let title = this.title; 
    let headers = new Headers();
  
    headers.append('Content-Type', 'application/json');

    let data = {
      username: username,
      title: title,
      id: id
    };



    for(let i = 0; i < this.comments.length; ++i){
      if(Object.is(data.id, this.comments[i]._id)){
        this.comments.splice(i, 1);
      }
    }

  


    this.http.post('http://localhost:8080/delete', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
    }, (err) => {
      console.error(err);
    })
  }
  
  editComment(id){
    let username = this.global.globalUser;
    let candidate = this.candidate;
    let title = this.title; 
    let description = this.description;
    let likes = this.likes;
    let headers = new Headers();
  
    headers.append('Content-Type', 'application/json');

    let data = {
      username: username,
      candidate: candidate,
      title: title,
      description: description,
      id: id,
      likes: likes
    };

    for(let i = 0; i < this.comments.length; ++i){
      if(Object.is(data.id, this.comments[i]._id)){
        this.comments.splice(i, 1);
      }
    }

    this.navCtrl.push(EditCommentPage, {
      id: id,
      username: username,
      candidate: candidate,
      title: title,
      description: description,
      likes: likes
      
    });

    /*this.http.post('http://localhost:8080/edit', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
      
      data = res.json();
    //ion view refresh comments completely ovewrite comments array and edit ppage 
      this.comments.push(data);
    }, (err) => {
      console.error(err);
    })   */   

    // document.getElementById('editForm').style.display = "none";
  }

  refreshComments(){
    let username = this.global.globalUser;

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
