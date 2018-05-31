import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginProvider {

	apiUrl : String="https://gestionfit-backend.herokuapp.com/"
  //apiUrl : String="http://localhost:8080/"
  
  httpOptions:any;

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }


  logIn(cred): Observable<any>{
  	return this.http.post(this.apiUrl +"auth/login",cred,{observe: "response"});
  }

  signup(newUser): Observable<any>{

 
  	return this.http.post(this.apiUrl+"auth/signup", newUser);
  }

  auth(): Observable<any>{
    if(localStorage.getItem("token") != null){
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")}),observe: "response"};}
    return this.http.get(this.apiUrl + "authenticate",this.httpOptions);
  }

}
