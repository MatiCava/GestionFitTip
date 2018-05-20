import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  apiUrl: String = 'http://localhost:8080/api/';

  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');

  }


}
