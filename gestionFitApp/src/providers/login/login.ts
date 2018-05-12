import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginProvider {

	apiUrl : String="http://gestionfit-backend.herokuapp.com/auth/"

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }


  logIn(cred): Observable<any>{
  	return this.http.post(this.apiUrl +"login",cred,{observe: "response"});
  }

  signup(newUser): Observable<any>{

 
  	return this.http.post(this.apiUrl+"signup", newUser);
  }

}
