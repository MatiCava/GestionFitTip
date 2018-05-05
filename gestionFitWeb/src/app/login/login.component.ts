import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public credential = {username: '', password: ''};
  public user: any;

  constructor(private loginServ: LoginService, private routerServ: Router) { }

  ngOnInit() {
  }

  onSubmit() { this.login(); }

  login() {
    this.loginServ.logIn(this.credential).subscribe(
      result => {
        console.log(result);
        this.user = result;
        console.log(this.user);
        localStorage.setItem("id", this.user.id);
        this.routerServ.navigate(['/alumnos']);
      },
      error => {
        console.log(error);
      }
      );
  }

  isLogged(){
    return localStorage.getItem("id") != null;
  }

}
