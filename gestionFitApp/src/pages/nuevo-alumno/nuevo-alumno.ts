import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { User_Student,User_Role } from '../../model/user_student'



@IonicPage(
	{name:"nuevoAlumno"}
)

@Component({
  selector: 'page-nuevo-alumno',
  templateUrl: 'nuevo-alumno.html',
})
export class NuevoAlumnoPage {

	/*public alumno:any = {"name":"","email":"","user":"","password":"",
	"telephone":"","age":"","birthday":"","pathologies":"","observations":"","objective":""
	,"routines":[],"measures":[]};
*/
  alumno = {username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", weigth:{}};
  userProvider: UserProvider;

  constructor(private alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, public serviceUser: UserProvider) {
    this.userProvider = serviceUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoAlumnoPage');
  }

  volverAtras(){
    this.navCtrl.push('alumnos');
  }

  guardarAlumno(){
    this.userProvider.addNewUserStudent(this.alumno).subscribe(
    () => { 
              let confirmacion = this.alertCtrl.create({
                    title: 'Confirmacion',
                    message: 'Se guardo el nuevo alumno',
                    buttons: [{
                      text: 'Ok',
                      handler: () => {
                        this.navCtrl.push('alumnos');
                      }
                    }] 
              }

              ); 
              confirmacion.present();
              er => {
                console.log(er);
              }
          });
    this.navCtrl.push('alumnos');
  }

}
