import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';


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

  constructor(private translateService: TranslateService, private loginServ: LoginService, private routerServ: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() { this.login(); }

  login() {
    this.loginServ.logIn(this.credentials.value).subscribe(
      result => {
        console.log(result);
        localStorage.setItem("token", result.body.token);
        this.routerServ.navigate(['/alumnos']);
      },
      error => {
        {if(error.status == 401){this.errorLogin=true;};console.log(error)};
      }
      );
  }

  isLogged() {
    return localStorage.getItem("id") != null;
  }

}
