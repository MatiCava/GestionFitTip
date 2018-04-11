import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Routine } from '../../model/routine';

/*
  Generated class for the RoutineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoutineProvider {

	//https://gestionfit-backend.herokuapp.com/

	apiUrl : String="http://localhost:8080/api/"

  constructor(public http: HttpClient) {
    console.log('Hello RoutineProvider Provider');
  }

  getRutines(): Observable<Routine[]>{
  	return this.http.get<Routine[]>(this.apiUrl+"routines");
  }

  getRoutine(id):Observable<any>{
    return this.http.get(this.apiUrl+"routine/"+id);
  }

}
