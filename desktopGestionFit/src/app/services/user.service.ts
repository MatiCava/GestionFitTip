import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class UserService {

  apiUrl : String="http://localhost:8080/api/";
  //apiUrl : String="http://gestionfit-backend.herokuapp.com/api/";

  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');

  }
  


}
