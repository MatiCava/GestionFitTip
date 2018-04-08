import { HttpClient ,HttpHeaders} from '@angular/common/http';
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
    //{headers: new HttpHeaders().set('Content-Type','application/json')}

    const httpOptions = {
          headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Accept': 'application/json',
                'Content-Type':  'application/json'
          })
    };
     
  	return this.http.post<User_Student>(this.apiUrl+"alumno", newUser, httpOptions);
  }

  getUser(id): Observable<any>{
    console.log("get user");
  	return this.http.get(this.apiUrl+"user/"+id)
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
