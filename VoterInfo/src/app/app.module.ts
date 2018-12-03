import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { GlobalProvider } from "../providers/global/global";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };


//import { SignUpPage } from '../pages/sign-up/sign-up';
import { StatusBar } from '@ionic-native/status-bar';
import { AddressPage } from '../pages/address/address';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyCommentsPage } from '../pages/my-comments/my-comments';
import { RepsPage } from '../pages/reps/reps';
import { RepDetailPage } from '../pages/rep-detail/rep-detail';
import { MessagesPage } from '../pages/messages/messages';
import { EditCommentPage } from '../pages/edit-comment/edit-comment';
import { NewMessagePage } from '../pages/new-message/new-message';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignUpPage,
    MyCommentsPage,
    AddressPage,
    AddressPage,
    RepsPage,
    RepDetailPage,
    MessagesPage,
    EditCommentPage,
    NewMessagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignUpPage,
    MyCommentsPage,
    AddressPage,
    AddressPage,
    RepsPage,
    RepDetailPage,
    MessagesPage,
    EditCommentPage,
    NewMessagePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
