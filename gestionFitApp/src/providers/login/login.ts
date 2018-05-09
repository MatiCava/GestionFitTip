import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginProvider {
	apiUrl : String="http://192.168.0.103:8080/api/"

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }


  logIn(cred): Observable<any>{
  	return this.http.post(this.apiUrl +"login",cred);
  }

}
