import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User_Student } from './../../model/user-student';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class AlumnosService {
	apiUrl : String="http://localhost:8080/api/";

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getUsersStudents(): Observable<any>{
  	return this.http.get(this.apiUrl+"alumnos/");
  }

  addNewUserStudent(newUser): Observable<any>{
    //{headers: new HttpHeaders().set('Content-Type','application/json')}

    const httpOptions = {
          headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Accept': 'application/json',
                'Content-Type':  'application/json'
          })
    };
     
  	return this.http.post(this.apiUrl+"alumno", newUser, httpOptions);
  }

  getUser(id): Observable<any>{
    console.log("get user");
  	return this.http.get(this.apiUrl+"user/"+id);
  }

  getTabla(id):Observable<any>{
  	return this.http.get(this.apiUrl+"user/"+id+"/table");
  }

  updateTable(id,measures):Observable<any>{
  	return this.http.put(this.apiUrl+"user/"+id+"/nuevaMedicion",measures);
  }

  getRutines(id):Observable<any>{
    return this.http.get(this.apiUrl+"user/"+id+"/rutinas");
  }

  updateRutines(id, rutines):Observable<any>{
    return this.http.put(this.apiUrl+"user/"+id+"/nuevasRutinas",rutines);
  }


}
