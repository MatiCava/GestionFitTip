import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";


@Injectable()
export class InstagramProvider {

	instagramToken:String="7212372427.e82612d.04861380ae2149f49d4c5dd5289d89f5";


  constructor(public http: HttpClient) {
    console.log('Hello InstagramProvider Provider');
  }

  getInstagramUserInfo():Observable<any> {
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.instagramToken + '&count=10');
  }

  getInstagramProfile():Observable<any>{
    return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + this.instagramToken );

  }


}
