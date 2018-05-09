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

  getRutines(): Observable<Routine[]>{
  	return this.http.get<Routine[]>(this.apiUrl+"routines");
  }

  getExercises(): Observable<Exercise[]>{
    return this.http.get<Exercise[]>(this.apiUrl+"exercises");
  }

  getRoutine(id):Observable<any>{
    return this.http.get(this.apiUrl+"routine/"+id);
  }

  saveRoutine(routine):Observable<any>{

    const httpOptions = {
          headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Accept': 'application/json',
                'Content-Type':  'application/json'
          })
    };

    return this.http.post<Routine>(this.apiUrl+"routine", routine, httpOptions);
  }

  saveExercise(exercise):Observable<any>{
    const httpOptions = {
          headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Accept': 'application/json',
                'Content-Type':  'application/json'
          })
    };

    return this.http.post<Exercise>(this.apiUrl+"exercise", exercise, httpOptions);
  }
}
