import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';


@IonicPage({name:"login"})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginProvider]
})
export class LoginPage {

	public credential = {username:"",password:""};
  public user:any;
  cantAccess: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginServ: LoginProvider,private plat: Platform) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  ionViewDidEnter(){
  }

    logged(){
    return localStorage.getItem("user_role") != null;
  }

  isStudent(){
    return localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Student";
  }

  isInstructor(){
    return localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Instructor";
  }

  login(){
  	this.loginServ.logIn(this.credential).subscribe(
  		result => {
  			this.user = result;
  			console.log(this.user);
  			localStorage.setItem("user_role",this.user.role);
        localStorage.setItem("id",this.user.id);
  			if(this.user.role == "Student"){
  				this.navCtrl.push("dashboard",{id:this.user.id});
  			}
  			else{
  				this.cantAccess = true;
  			}
  		},
  		error => {
  			console.log(error);
  		}
  		)
  }

  signUp(){
    this.navCtrl.push("nuevoAlumno");
  }

}
