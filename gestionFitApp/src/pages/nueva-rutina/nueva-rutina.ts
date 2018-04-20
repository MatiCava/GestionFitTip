import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Routine, Routine_Type } from '../../model/routine';
import { RoutineProvider } from '../../providers/routine/routine';

@IonicPage({
	name: 'nuevaRutina'
})
@Component({
  selector: 'page-nueva-rutina',
  templateUrl: 'nueva-rutina.html',
})
export class NuevaRutinaPage {

	exercises:any[];
	exercisesAlumno:any[] = [];
	rutinasType=[Routine_Type[4], Routine_Type[3], Routine_Type[2], Routine_Type[1], Routine_Type[0]];
	newRoutine;

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineProvider: RoutineProvider) {
  	this.newRoutine = {creationDate:new Date().getTime(), type:"", exercise:[]};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaRutinaPage');
    this.traerEjercicios()
  }

  volverAtras(){
    this.navCtrl.push('alumnos');
  }

  traerEjercicios(){
    this.routineProvider.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  }

  guardarEjercicios(){
  	this.exercisesAlumno = this.exercises.filter(ex => ex.checked == true);
  	console.log(this.exercisesAlumno);
  	this.newRoutine.exercise = this.exercisesAlumno;
  }

  guardarRutina(){
  	let type = Routine_Type[this.newRoutine.type];
    this.newRoutine.type = type;
    this.guardarEjercicios();
    console.log(this.newRoutine);
    this.routineProvider.saveRoutine(this.newRoutine).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	//this.volverAtras();
  }
}
