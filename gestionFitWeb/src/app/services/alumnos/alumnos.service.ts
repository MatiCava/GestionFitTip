import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User_Student } from './../../model/user-student';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class AlumnosService {
  apiUrl : String="http://localhost:8080/api/";
  
  httpOptions: any;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

  }



  getUsersStudents(): Observable<any>{

  	return this.http.get(this.apiUrl+"alumnos", this.httpOptions);
  }

  addNewUserStudent(newUser): Observable<any>{
    //{headers: new HttpHeaders().set('Content-Type','application/json')}

   
     
  	return this.http.post(this.apiUrl+"alumno", newUser, this.httpOptions);
  }

  getUser(id): Observable<any>{
    console.log("get user");
  	return this.http.get(this.apiUrl+"user/"+id, this.httpOptions);
  }

  getTabla(id):Observable<any>{
  	return this.http.get(this.apiUrl+"user/"+id+"/table", this.httpOptions);
  }

  updateTable(id,measures):Observable<any>{
  	return this.http.put(this.apiUrl+"user/"+id+"/nuevaMedicion",measures,this.httpOptions);
  }

  getRutines(id):Observable<any>{
    return this.http.get(this.apiUrl+"user/"+id+"/rutinas",this.httpOptions);
  }

  updateRutines(id, rutines):Observable<any>{
    return this.http.put(this.apiUrl+"user/"+id+"/nuevasRutinas",rutines, this.httpOptions);
  }


}
