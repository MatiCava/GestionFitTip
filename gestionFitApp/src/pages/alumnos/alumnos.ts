import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Nav} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage({
  name: 'alumnos'
})
@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
  providers: [UserProvider]
})
export class AlumnosPage {

	@ViewChild(Nav) nav: Nav;
	alumnos:any = [{"name":"Alfredo"},{"name":"Carlo"},{"name":"Roberto"}];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnosPage');
    this.getAlumnos();
  }

  getAlumnos(){
  	this.userService.getUsersStudents().subscribe(
  		students => {this.alumnos = students;console.log(students)},
  		error => {console.log(error)}
  		);
  }

  nuevoAlumno(){
  	this.navCtrl.push('nuevoAlumno');
  }

}
