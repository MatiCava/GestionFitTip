import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { User_Student } from '../../model/user_student';


@Injectable()
export class UserProvider {


  apiUrl : String="https://gestionfit-backend.herokuapp.com/api/";
  //apiUrl : String="http://localhost:8080/api/";

  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUsersStudents(): Observable<User_Student[]>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})};

  	return this.http.get<User_Student[]>(this.apiUrl+"alumnos/");
  }



  getUser(id): Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})};
  	return this.http.get(this.apiUrl+"user/"+id, this.httpOptions);
  }

  getTabla(id):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})};

  	return this.http.get(this.apiUrl+"user/"+id+"/table", this.httpOptions);
  }


  getRutines(id):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})};

    return this.http.get(this.apiUrl+"user/"+id+"/rutinas", this.httpOptions);
  }


  checkUsername(user){
    return this.http.get(this.apiUrl + "checkUsername/" + user);
  }

  checkEmail(email){
    return this.http.get(this.apiUrl + "checkEmail/" + email);
  }



 

}
