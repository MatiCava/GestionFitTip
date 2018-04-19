import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine';
import { Routine, Routine_Type } from '../../model/routine';
import { Exercise, ExerciseType } from '../../model/exercise';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RutinasInstructorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'rutinasInstructor',
  segment: 'alumno/:id/nuevaRutina'
})
@Component({
  selector: 'page-rutinas-instructor',
  templateUrl: 'rutinas-instructor.html',
  providers: [RoutineProvider,
  			  UserProvider]
})
export class RutinasInstructorPage {
	id:any;
	rutinas: any[];
  //exercises: any[];
	rutinaAlumno:any = {};
  rutinasType=[Routine_Type[4], Routine_Type[3], Routine_Type[2], Routine_Type[1], Routine_Type[0]];
  exercisesType=[ExerciseType[1], ExerciseType[0], ExerciseType[3], ExerciseType[2]];
  exercisesAlumno:any[] = [];
  newExercise = {name:"", description:"", typeE:""};
  newRoutine;

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineProvider: RoutineProvider, private userService: UserProvider) {
  	this.id = this.navParams.get("id");
  	this.newRoutine = {creationDate:new Date().getTime(), type:"", exercise:this.exercisesAlumno};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutinasInstructorPage');
    this.traerRutinas();
    //this.traerEjercicios();
  }

  volverAtras(){
    this.navCtrl.push('alumnos');
  }

  guardarRutinasAlumno(){
    console.log(this.rutinaAlumno);
    //let type = Routine_Type[this.newRoutine.type];
    //this.newRoutine.type = type;
    console.log(this.newRoutine.type);
  	this.userService.updateRutines(this.id,this.rutinaAlumno).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }

  guardarEjercicio(){
    console.log(this.newExercise);
    let type = ExerciseType[this.newExercise.typeE];
    this.newExercise.typeE = type;
    this.exercisesAlumno.push(this.newExercise); 
    console.log(this.exercisesAlumno);
  }

  traerRutinas(){
  	this.routineProvider.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }

 /*

  traerEjercicios(){
    this.rutinasProvider.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  } */

}
