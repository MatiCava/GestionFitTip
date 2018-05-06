import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private translateService: TranslateService, private routerService: Router) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  ngOnInit() {
    if (!this.isLogged()) {
      this.routerService.navigate(["/login"]);
    }
  }

  alumnos() {
    this.routerService.navigate(["/alumnos"]);
  }

  rutinas(){
    this.routerService.navigate(["/rutinas"]);
  }
  
  nuevaRutina(){
    this.routerService.navigate(["/rutinas/nueva"]);
  }

  nuevoEjercicio(){
    this.routerService.navigate(["/ejercicios/nuevo"]);
  }

  isLogged(){
    return localStorage.getItem("token") != null;
  }

  logout(){
    localStorage.removeItem("token");
    this.routerService.navigate(["/login"]);
  }
}
