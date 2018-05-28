import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';



@IonicPage({name:"login"})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginProvider]
})
export class LoginPage {

  public user:any;
  cantAccess: boolean = false;
  errorLogin: boolean = false;

  credentials: FormGroup = this.formBuilder.group({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public loginServ: LoginProvider,private plat: Platform) {
  }



    logged(){
    return localStorage.getItem("token") != null;
  }

  isStudent(){
    return localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Student";
  }

  isInstructor(){
    return localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Instructor";
  }

  onSubmit() { this.login(); }


  login(){
  	this.loginServ.logIn(this.credentials.value).subscribe(
  		result => {
  			console.log(result);
        localStorage.setItem("id",result.body.id);
        localStorage.setItem("token",result.body.token);
        this.navCtrl.push("dashboard",{id:result.body.id});

  		},
  		error => {
        {if(error.status == 401){this.errorLogin=true;};console.log(error)};
        
  		}
  		)
  }

  signUp(){
    this.navCtrl.push("nuevoAlumno");
  }

}
