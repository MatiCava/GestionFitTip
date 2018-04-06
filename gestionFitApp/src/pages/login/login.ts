import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { AlumnosPage } from '../alumnos/alumnos';


@IonicPage({name:"login"})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginProvider]
})
export class LoginPage {

	public credential = {username:"",password:""};
	public user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginServ: LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
  	this.loginServ.logIn(this.credential).subscribe(
  		result => {
  			this.user = result;
  			console.log(this.user);
  			localStorage.setItem("user_role",this.user.role);
  			if(this.user.role == "Student"){
  				this.navCtrl.push("dashboard",{"id":this.user.id});
  			}
  			else{
  				this.navCtrl.push(AlumnosPage,{"id":this.user.id});
  			}
  		},
  		error => {
  			console.log(error);
  		}
  		)
  }

}
