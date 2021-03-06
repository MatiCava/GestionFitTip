import { Component, OnInit,ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent implements OnInit{
  title = 'GestionFit';

  constructor(private translateService: TranslateService, private routerService: Router,private loginServ : LoginService) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  ngOnInit() {

  }

  changeRoute() {
    this.loginServ.auth().subscribe(
      res => console.log(res),
      error => {console.log(error);localStorage.clear();this.routerService.navigate(["/login"])}
    );

/*    if (!this.isLogged()) {
      this.routerService.navigate(["/login"]);
    }*/
  }

  calendario(){
    this.cerrarSidebar();
    this.routerService.navigate(["/calendario-general"]);
  }

  changeLang(lang){
    this.translateService.use(lang);
  }

  isAdmin() {
    return localStorage.getItem('rol') === 'ADMIN';
  }

  instructores(){
    this.cerrarSidebar();
    this.routerService.navigate(['/instructores']);
  }



  alumnos() {
    this.cerrarSidebar();
    this.routerService.navigate(["/alumnos"]);
  }

  rutinas(){
    this.cerrarSidebar();
    this.routerService.navigate(["/rutinas"]);
  }

  ejercicios(){
    this.cerrarSidebar();
    this.routerService.navigate(["/ejercicios"]);
  }
  
  nuevaRutina(){
    this.cerrarSidebar();
    this.routerService.navigate(["/rutinas/nueva"]);
  }

  nuevoEjercicio(){
    this.cerrarSidebar();
    this.routerService.navigate(["/ejercicios/nuevo"]);
  }

  isLogged(){
    return localStorage.getItem("token") != null;
  }

  logout(){
    this.cerrarSidebar();
    localStorage.removeItem("token");
    this.routerService.navigate(["/login"]);
  }

  promos(){
    this.cerrarSidebar();
    this.routerService.navigate(["/promos"]);
  }

  cerrarSidebar(){
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');

  }
}
