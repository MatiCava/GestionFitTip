import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent implements OnInit {

  public instructores:any;

  constructor(private translateService: TranslateService, private userService: AlumnosService,
    private routerServ: Router, private spinner: NgxSpinnerService) {
    this.instructores = [];
   }

  ngOnInit() {
    this.getInstructores();

  }

  infoInstructor(idAl)  {
    this.routerServ.navigate(['/instructor/info', idAl]);
  }

  agregarClasesInstructor(idAl) {
    this.routerServ.navigate(['/instructor/clases/agregar', idAl]);
  }


  getInstructores(){
    this.spinner.show();
  	this.userService.getUsersInstructors().subscribe(
  		res => {this.instructores = res;this.spinner.hide();},
  		error => {console.log(error);this.spinner.hide();}
  		);
  }



  cerrarSidebar(){

    $('#sidebar, #content').toggleClass('active');


}
}
