import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine';
import { Routine, RoutineType } from '../../model/routine';
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
	rutinasProvider: RoutineProvider;
	id:any;
	//rutinas: any[];
  //exercises: any[];
	rutinasAlumno:any = {};
  rutinasType=[RoutineType[4], RoutineType[3], RoutineType[2], RoutineType[1], RoutineType[0]];
  exercisesType=[ExerciseType[1], ExerciseType[0], ExerciseType[3], ExerciseType[2]];
  exercisesAlumno:any[] = [];
  newExercise = {name:"", description:"", typeE:""};
  newRoutine = {creationDate:new Date().getTime(), typeR:"", exercise:this.exercisesAlumno};

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineProvider: RoutineProvider, private userService: UserProvider) {
  	this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutinasInstructorPage');
    //this.traerRutinas();
    //this.traerEjercicios();
  }

  volverAtras(){
    this.navCtrl.push('alumnos');
  }

  guardarRutinasAlumno(){
    console.log(this.newRoutine);
    let type = RoutineType[this.newRoutine.typeR];
    this.newRoutine.typeR = type;
    console.log(this.newRoutine.typeR);
  	this.userService.updateRutines(this.id,this.newRoutine).subscribe(
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
/*
  traerRutinas(){
  	this.rutinasProvider.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }

  traerEjercicios(){
    this.rutinasProvider.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  } */

}
