import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Exercise } from '../../model/exercise';
import { Routine } from '../../model/routine';

@Injectable()
export class RoutineService {

  apiUrl : String="http://localhost:8080/api/"

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
