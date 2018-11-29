import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  street: any;
  state: any;
  zip: any;
  city: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  submitAddress() {
    //check for valid inputs
    let address = this.street + ", " + this.city + ", " + this.state + " " + this.zip;
    let data = {
      address: address
    }
    console.log(address);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/candidates', JSON.stringify(data), { headers: headers }).subscribe((res) => {

    }, (err) => console.log(err));

  }

}
