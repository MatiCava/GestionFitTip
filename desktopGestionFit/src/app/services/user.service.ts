import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  apiUrl: String = 'http://localhost:8080/api/';

  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');

  }

  marcarAsistencia(rfid): Observable<any>{
    return this.http.post(this.apiUrl + "assist/student/" + rfid,{});
  }


}
