import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  apiUrl: String = "http://localhost:8080/api/";

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }


  logIn(cred): Observable<any> {
    return this.http.post(this.apiUrl + "login", cred);
  }
}
