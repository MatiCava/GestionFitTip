import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Routine } from '../../model/routine';
import { Exercise } from '../../model/exercise'


@Injectable()
export class RoutineProvider {

	//apiUrl : String="https://gestionfit-backend.herokuapp.com/api/"
  apiUrl : String="http://localhost:8080/api/";

  constructor(public http: HttpClient) {
    console.log('Hello RoutineProvider Provider');
  }



  getRoutine(id):Observable<any>{
    return this.http.get(this.apiUrl+"routine/"+id,{headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})});
  }


}
