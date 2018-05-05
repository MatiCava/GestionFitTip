import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginProvider {
	apiUrl : String="http://localhost:8080/auth/"

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }


  logIn(cred): Observable<any>{
  	return this.http.post(this.apiUrl +"login",cred,{observe: "response"});
  }

}
