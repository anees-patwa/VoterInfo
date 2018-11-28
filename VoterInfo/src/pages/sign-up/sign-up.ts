import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
 
// @Injectable()
// export class Reviews {
 
//   userName: String = '';
//   password: String = '';

//   data: any;
 
//   constructor(public http: Http) {
//     this.data = {
//       userName: this.userName,
//       password: this.password
//     }
//   }
 
//   login(){
//     alert(this.data);
//     if (this.data) {
//       return Promise.resolve(this.data);
//     }
 
//     return new Promise(resolve => {
 
//       this.http.get('http://localhost:8080/api/reviews')
//         .map(res => res.json())
//         .subscribe(data => {
//           this.data = data;
//           resolve(this.data);
//         });
//     });
 
//   }
 
//   createAccount(review){
 
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
 
//     this.http.post('http://localhost:8080/login', JSON.stringify(review), {headers: headers})
//       .subscribe(res => {
//         console.log(res.json());
//       });
 
//   }
// }


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  
})


export class SignUpPage {
  username: any;
  password: any;
  
  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }
 

  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  login(){
    //console.log(data);
    let data = {
      username: this.username,
      password: this.password
    };
    console.log(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/login', JSON.stringify(data), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }

  createAccount(){
    //console.log(data);
    let data = {
      username: this.username,
      password: this.password
    };
    console.log(data);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/signup', JSON.stringify(data), {headers: headers}).subscribe((res) => {
      console.log(res);
    }, (err) => console.log(err));
 
  }
}
