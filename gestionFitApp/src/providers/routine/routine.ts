import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Routine } from '../../model/routine';
import { Exercise } from '../../model/exercise'

/*
  Generated class for the RoutineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoutineProvider {

	//https://gestionfit-backend.herokuapp.com/

	apiUrl : String="http://192.168.0.103:8080/api/"

  constructor(public http: HttpClient) {
    console.log('Hello RoutineProvider Provider');
  }



  getRoutine(id):Observable<any>{
    return this.http.get(this.apiUrl+"routine/"+id,{headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})});
  }


}
