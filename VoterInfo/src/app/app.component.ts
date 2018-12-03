import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { GlobalProvider } from '../providers/global/global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SignUpPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, global: GlobalProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /*console.log(global.globalUser);
      if (global.globalUser) {

        this.rootPage = TabsPage;
      } else {
        this.rootPage = SignUpPage;
      }*/
    });
  }
}
