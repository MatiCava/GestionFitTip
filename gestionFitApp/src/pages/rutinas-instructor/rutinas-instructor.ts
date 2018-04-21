import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine';
import { Routine, Routine_Type } from '../../model/routine';
import { Exercise, Exercise_Type } from '../../model/exercise';
import { UserProvider } from '../../providers/user/user';

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
	rutinaAlumno:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineProvider: RoutineProvider, private userService: UserProvider) {
  	this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutinasInstructorPage');
    this.traerRutinas();
  }

  volverAtras(){
    this.navCtrl.push('alumnos');
  }

  guardarRutinasAlumno(){
    this.rutinaAlumno = this.rutinas.filter(ex => ex.checked == true);
    console.log(this.rutinaAlumno);
  	this.userService.updateRutines(this.id,this.rutinaAlumno).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }

  traerRutinas(){
  	this.routineProvider.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }

}
