import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http, Headers } from '@angular/http';
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
  id: any;
  description: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, global: GlobalProvider, public http: Http) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCommentPage');
  }

  editComment(){
    
    let headers = new Headers();
  
    headers.append('Content-Type', 'application/json');

    let data = {
      id: this.id,
      description: this.description
    };
    this.http.post('http://localhost:8080/edit', JSON.stringify(data), { headers: headers }).subscribe((res) => {
      console.log(res.json());
    }, (err) => {
      console.error(err);
    })
    // document.getElementById('editForm').style.display = "none";
  }

}
