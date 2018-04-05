import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage({
	name: 'tablaMedicion',
	segment: 'alumno/:id/tabla'
}
	)

@Component({
  selector: 'page-tabla-medicion-alumno',
  templateUrl: 'tabla-medicion-alumno.html',
  providers:[UserProvider]
})
export class TablaMedicionAlumnoPage {

	tabla : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider) {
  }

  ionViewDidLoad() {
    this.getTabla();
  }

  getTabla(){
  	this.userServ.getTabla(this.navParams.get("id")).subscribe(
  		table => {this.tabla = table;console.log(table)},
  		error => {console.log(error)}
  		)
  }

}
