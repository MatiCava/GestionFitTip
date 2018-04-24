import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  apiUrl: String = "http://localhost:8080/api/";

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }


  logIn(cred): Observable<any> {
    return this.http.post(this.apiUrl + "login", cred);
  }
}
