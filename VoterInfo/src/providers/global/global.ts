import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public globalUser: String;
  public globalSocket: any;
  public globalIsRep: any;
  constructor() {
    console.log('Hello GlobalProvider Provider');
  }

}
