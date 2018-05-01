import { Component, OnInit } from '@angular/core';
import { Exercise, Exercise_Type } from './../model/exercise';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-ejercicio',
  templateUrl: './nuevo-ejercicio.component.html',
  styleUrls: ['./nuevo-ejercicio.component.css']
})
export class NuevoEjercicioComponent implements OnInit {

  exercisesType=[Exercise_Type[1], Exercise_Type[0], Exercise_Type[3], Exercise_Type[2]];
	newExercise;

  constructor(private routineServ: RoutineService, private router: Router) {
    this.newExercise = {name:"", description:"", type:""};
  }

  ngOnInit() {
  }

  volverAtras(){
    this.router.navigate(['/alumnos']);
  }
//<input type="text" [(ngModel)]="newExercise.description">
  guardarEjercicio(){
  	let type = Exercise_Type[this.newExercise.type];
    this.newExercise.type = type;
    console.log(this.newExercise);
    this.routineServ.saveExercise(this.newExercise).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }

}
