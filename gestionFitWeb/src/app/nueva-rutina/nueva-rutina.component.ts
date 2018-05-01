import { Component, OnInit } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-rutina',
  templateUrl: './nueva-rutina.component.html',
  styleUrls: ['./nueva-rutina.component.css']
}) //para reutilizar proba hacer nuevo component y poner en templateUrl la de este
export class NuevaRutinaComponent implements OnInit {

  exercises:any[];
	exercisesAlumno:any[] = [];
	rutinasType=[Routine_Type[4], Routine_Type[3], Routine_Type[2], Routine_Type[1], Routine_Type[0]];
  newRoutine;
  isEdit = false;
  isNew = true;

  constructor(private routineServ: RoutineService, private router: Router) {
    this.newRoutine = {name:"", creationDate:new Date().getTime(), type:"", exercises:[]};
  }

  ngOnInit() {
    this.traerEjercicios();
  }

  volverAtras(){
    this.router.navigate(['/alumnos']);
  }

  traerEjercicios(){
    this.routineServ.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  }

  guardarEjercicios(){
  	this.exercisesAlumno = this.exercises.filter(ex => ex.checked == true);
  	console.log(this.exercisesAlumno);
  	this.newRoutine.exercises = this.exercisesAlumno;
  }

  guardarRutina(){
  	let type = Routine_Type[this.newRoutine.type];
    this.newRoutine.type = type;
    this.guardarEjercicios();
    console.log(this.newRoutine);
    this.routineServ.saveRoutine(this.newRoutine).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }
}
