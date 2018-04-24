import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/login.service';
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
        this.user = result;
        console.log(this.user);
        localStorage.setItem("id", this.user.id);
        this.routerServ.navigate(['/alumnos', {id: this.user.id}]);
      },
      error => {
        console.log(error);
      }
      );
  }

}