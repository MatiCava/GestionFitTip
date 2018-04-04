import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { User_Student } from '../../model/user_student';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

	apiUrl : String="http://localhost:8080/api/"

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUsersStudents(): Observable<User_Student[]>{
  	return this.http.get<User_Student[]>(this.apiUrl+"alumnos/");
  }

  addNewUserStudent(newUser): Observable<User_Student>{
  	return this.http.post<User_Student>(this.apiUrl+"alumno/1", newUser);
  }

}
