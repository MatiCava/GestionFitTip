import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Exercise } from '../../model/exercise';
import { Routine } from '../../model/routine';

@Injectable()
export class RoutineService {

  apiUrl : String="http://localhost:8080/api/";

  httpOptions :any ;

  constructor(public http: HttpClient) {
    console.log('Hello RoutineProvider Provider');
  }

  getRutines(): Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

  	return this.http.get(this.apiUrl+"routines", this.httpOptions);
  }

  getExercises(): Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.get(this.apiUrl+"exercises" , this.httpOptions);
  }

  getRoutine(id):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.get(this.apiUrl+"routine/"+id, this.httpOptions);
  }

  getExercise(id):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}
    return this.http.get(this.apiUrl+"exercise/"+id, this.httpOptions);
  }

  deleteRoutine(id):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.delete(this.apiUrl+"routine/"+id, this.httpOptions);
  }

  deleteExercise(id):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.delete(this.apiUrl+"exercise/"+id, this.httpOptions);
  }

  saveRoutine(routine):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}


    return this.http.post(this.apiUrl+"routine", routine, this.httpOptions);
  }

  saveExercise(exercise):Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}


    return this.http.post(this.apiUrl+"exercise", exercise, this.httpOptions);
  }

  updateRoutine(id, routine): Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.put(this.apiUrl+"routine/"+id, routine, this.httpOptions);
  }

  updateExercise(id, exercise): Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}
    return this.http.put(this.apiUrl+"exercise/"+id, exercise, this.httpOptions);
  }

  routineTypes():Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.get(this.apiUrl + "routines/types",this.httpOptions)
  }

  exerciseTypes():Observable<any>{
    this.httpOptions = {headers: new HttpHeaders({"Authorization": localStorage.getItem("token")})}

    return this.http.get(this.apiUrl + "exercises/types",this.httpOptions)
  }
}
