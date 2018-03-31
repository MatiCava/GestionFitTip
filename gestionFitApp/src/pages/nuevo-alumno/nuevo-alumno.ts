import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage(
	{name:"nuevoAlumno"}
)

@Component({
  selector: 'page-nuevo-alumno',
  templateUrl: 'nuevo-alumno.html',
})
export class NuevoAlumnoPage {

	public alumno:any = {"name":"","email":"","user":"","password":"",
	"telephone":"","age":"","birthday":"","pathologies":"","observations":"","objective":""
	,"routines":[],"measures":[]};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoAlumnoPage');
  }

}
