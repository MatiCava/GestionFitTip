import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { User_Student } from '../../model/user_student'
import { InfoRutinaPage } from '../info-rutina/info-rutina';



@IonicPage({
	name: 'infoAlumno'
})
@Component({
  selector: 'info-alumno',
  templateUrl: 'info-alumno.html',
  providers:[UserProvider]
})
export class InfoAlumnoPage {

  id: any;
  user:any;
  @Input() set nUser(nUser){
    this.user = nUser;
  }

  get nUser(){
    return this.user;
  }
  

  constructor(public navCtrl: NavController,private viewCtrl: ViewController, public navParams: NavParams, private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
    this.user={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
  }

  
  sinRutinas(){
    return this.user.routines.length == 0;
  }


  abrirInfo(idRoutine){
    console.log(idRoutine);
   this.navCtrl.push(InfoRutinaPage,{id:idRoutine}); 
   
  }


}
