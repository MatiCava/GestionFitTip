import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { User_Student } from '../../model/user_student'


/**
 * Generated class for the InfoAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'infoAlumno'
})
@Component({
  selector: 'page-info-alumno',
  templateUrl: 'info-alumno.html',
  providers:[UserProvider]
})
export class InfoAlumnoPage {

	id: any;
	alumno: User_Student;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
    this.getInfoAlumno();
  }

  getInfoAlumno(){
  	this.userServ.getUser(this.id).subscribe(
  			user => {this.alumno = user;console.log(this.alumno)},
  			err => {console.log(err)}
  			)
  }

}
