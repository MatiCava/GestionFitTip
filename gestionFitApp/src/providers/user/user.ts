import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { User_Student } from '../../model/user_student';


@Injectable()
export class UserProvider {

  apiUrl : String="http://localhost:8080/api/";
  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})};
  }

  getUsersStudents(): Observable<User_Student[]>{
  	return this.http.get<User_Student[]>(this.apiUrl+"alumnos/");
  }

  addNewUserStudent(newUser): Observable<any>{
 
  	return this.http.post(this.apiUrl+"alumno", newUser, this.httpOptions);
  }

  getUser(id): Observable<any>{
    console.log("get user");
  	return this.http.get(this.apiUrl+"user/"+id, this.httpOptions);
  }

  getTabla(id):Observable<any>{
  	return this.http.get(this.apiUrl+"user/"+id+"/table", this.httpOptions);
  }


  getRutines(id):Observable<any>{
    return this.http.get(this.apiUrl+"user/"+id+"/rutinas", this.httpOptions);
  }


 

}
