import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { InfoRutinaPage } from '../info-rutina/info-rutina'

@IonicPage({
	name: 'rutinasAlumno',
	segment: 'alumno/:id/rutinas'
})
@Component({
  selector: 'page-rutinas-alumno',
  templateUrl: 'rutinas-alumno.html',
  providers:[UserProvider]
})
export class RutinasAlumnoPage {

	id:any;
  rutinas: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider) {
  	this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    this.getRutines();
  }

  volverAtras(){
    this.navCtrl.push('dashboard');
  }

  abrirInfo(idRoutine){
    this.navCtrl.push(InfoRutinaPage,{id:idRoutine}); 
    
  }

  getRutines(){
    this.userService.getRutines(this.id).subscribe(
          rutines => {this.rutinas = rutines;console.log(this.rutinas)},
          error => {console.log(error)}
          )
  }

  

}
