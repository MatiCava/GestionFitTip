import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
	private alumno;//= {username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", weigth:{}, edad:{}};

  constructor(public navCtrl: NavController,private viewCtrl: ViewController, public navParams: NavParams, private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
    this.alumno={};
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

  cancel(){
    this.viewCtrl.dismiss();
  }

}
