import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Nav} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { User_Student } from '../../model/user_student'



@IonicPage({
  name: 'alumnos'
})
@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
  providers: [UserProvider]
})
export class AlumnosPage {

  alumnoProvider: UserProvider;
  alumnos: User_Student[];

	@ViewChild(Nav) nav: Nav;
	//alumnos:any = [{"nameAndSurname":"Alfredo"},{"nameAndSurname":"Carlo"},{"nameAndSurname":"Roberto"}];

  constructor(public navCtrl: NavController, public navParams: NavParams,private userService: UserProvider) {
    this.alumnoProvider = userService;
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
