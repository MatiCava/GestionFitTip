import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  credentials: FormGroup = this.formBuilder.group({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });
  public user: any;
  errorLogin = false;

  constructor(private translateService: TranslateService, private loginServ: LoginService, private routerServ: Router,private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.loginServ.auth().subscribe(
      res => {this.routerServ.navigate(["/alumnos"]);},
      error => {console.log("Not logged");console.log(error);}
    );

  }

  onSubmit() { this.login(); }

  login() {
    this.spinner.show();
    this.loginServ.logIn(this.credentials.value).subscribe(
      result => {
        localStorage.setItem("token", result.body.token);
        localStorage.setItem("id",result.body.id);
        localStorage.setItem("rol",result.body.role);
        this.routerServ.navigate(['/alumnos']);
        this.spinner.hide();
      },
      error => {
        {if(error.status == 401){this.errorLogin=true;};console.log(error);this.spinner.hide();};
      }
      );
  }

  isLogged() {
    return localStorage.getItem("token") != null;
  }

}
