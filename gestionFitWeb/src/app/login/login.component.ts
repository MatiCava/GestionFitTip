import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/services/login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public credential = {email: '', password: ''};
  public user: any;

  constructor(private translateService: TranslateService, private loginServ: LoginService, private routerServ: Router) { }

  ngOnInit() {
  }

  onSubmit() { this.login(); }

  login() {
    this.loginServ.logIn(this.credential).subscribe(
      result => {
        console.log(result);
        console.log(result.body.token);
        console.log(result.body.id);
//        this.user = result;
//        console.log(this.user);
        localStorage.setItem("token", result.body.token);
        this.routerServ.navigate(['/alumnos']);
      },
      error => {
        console.log(error);
      }
      );
  }

  isLogged() {
    return localStorage.getItem("id") != null;
  }

}
