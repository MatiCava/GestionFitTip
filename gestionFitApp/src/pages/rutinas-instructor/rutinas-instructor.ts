import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine'
import { Routine } from '../../model/routine'
import { UserProvider } from '../../providers/user/user'

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
	rutinas: any[];
	rutinasAlumno:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineProvider: RoutineProvider, private userService: UserProvider) {
  	this.rutinasProvider = routineProvider;
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
    console.log(this.rutinasAlumno);
  	this.userService.updateRutines(this.id,this.rutinasAlumno).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }

  traerRutinas(){
  	this.rutinasProvider.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }

}
