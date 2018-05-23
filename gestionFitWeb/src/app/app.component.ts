import { Component, OnInit,ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GestionFit';

  constructor(private translateService: TranslateService, private routerService: Router) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  ngOnInit() {

  }

  changeRoute() {
    if (!this.isLogged()) {
      this.routerService.navigate(["/login"]);
    }
  }

  changeLang(lang){
    this.translateService.use(lang);
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


  cerrarSidebar(){
      $('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');

  }
}
