import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';


@IonicPage(
{
	name:"dashboard",
	segment:"alumno/:id/home"
})
@Component({
  selector: 'page-dashboard-alumno',
  templateUrl: 'dashboard-alumno.html',
  providers:[UserProvider]
})
export class DashboardAlumnoPage {

	id:any;

  user = {username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", age:{}, weigth:{}};

  constructor(public navCtrl: NavController, public navParams: NavParams, private userServ : UserProvider) {
  	this.id = this.navParams.get("id")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardAlumnoPage');
  }

  ionViewDidEnter(){
  	    this.getUser();

  }

  getUser(){
  	this.userServ.getUser(this.id).subscribe(
  		alumno => {this.user = alumno},
  		error => {console.log(error)})
  }

  verTabla(){
  	this.navCtrl.push('tablaMedicion',{id:this.id});
  }

}
