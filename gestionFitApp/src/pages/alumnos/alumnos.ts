import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Nav} from 'ionic-angular';


@IonicPage({
  name: 'alumnos'
})
@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
})
export class AlumnosPage {

	@ViewChild(Nav) nav: Nav;
	alumnos:any = [{"name":"Alfredo"},{"name":"Carlo"},{"name":"Roberto"}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnosPage');
  }

  nuevoAlumno(){
  	this.navCtrl.push('nuevoAlumno');
  }

}
