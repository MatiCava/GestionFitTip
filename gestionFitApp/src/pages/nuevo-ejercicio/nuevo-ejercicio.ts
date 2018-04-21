import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Exercise, Exercise_Type } from '../../model/exercise';
import { RoutineProvider } from '../../providers/routine/routine';

@IonicPage({
	name: 'nuevoEjercicio'
})
@Component({
  selector: 'page-nuevo-ejercicio',
  templateUrl: 'nuevo-ejercicio.html',
})
export class NuevoEjercicioPage {

	exercisesType=[Exercise_Type[1], Exercise_Type[0], Exercise_Type[3], Exercise_Type[2]];
	newExercise;

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineProvider: RoutineProvider) {
  	this.newExercise = {name:"", description:"", type:""};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoEjercicioPage');
  }

  volverAtras(){
    this.navCtrl.push('alumnos');
  }

  guardarEjercicio(){
  	let type = Exercise_Type[this.newExercise.type];
    this.newExercise.type = type;
    console.log(this.newExercise);
    this.routineProvider.saveExercise(this.newExercise).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }

}
