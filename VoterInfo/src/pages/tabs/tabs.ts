import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import { AddressPage } from '../address/address';
import { MyCommentsPage } from '../my-comments/my-comments';
import { MessagesPage } from '../messages/messages';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddressPage;
  tab2Root = MyCommentsPage;
  //Messages page
  tab3Root = MessagesPage;
  username: any;

  constructor(public navParams: NavParams) {
    this.username = navParams.get('username');
  }
}
