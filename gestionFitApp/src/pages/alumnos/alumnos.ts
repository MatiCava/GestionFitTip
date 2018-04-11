import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Nav,ModalController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User_Student } from '../../model/user_student';
import { InfoAlumnoPage } from '../info-alumno/info-alumno'



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

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,private userService: UserProvider) {
    this.alumnoProvider = userService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnosPage');
    this.getAlumnos();
  }

  abrirInfo(idUser){
    let infoModal = this.modalCtrl.create(InfoAlumnoPage,{id:idUser});
    infoModal.present();
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

  medidasAlumno(idUser){
  	this.navCtrl.push('tablaMedicion',{id:idUser});
  }

  rutinasAlumno(idUser){
    this.navCtrl.push('rutinasInstructor', {id:idUser});
  }

}
