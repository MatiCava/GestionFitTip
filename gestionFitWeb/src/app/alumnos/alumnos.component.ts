import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './../services/alumnos/alumnos.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public alumnos:any;

  constructor(private translateService: TranslateService, private userService: AlumnosService,private routerServ: Router) {
    this.alumnos = [];
   }

  ngOnInit() {
    this.getAlumnos();
  }

  infoAlumno(idAl){
    this.routerServ.navigate(['/alumno/info', idAl]);
  }

  medicionesAlumno(idAl){
    this.routerServ.navigate(['/alumno/mediciones',idAl]);
  }


  getAlumnos(){
  	this.userService.getUsersStudents().subscribe(
  		res => {this.alumnos = res;console.log(res)},
  		error => {console.log(error)}
  		);
  }

  rutinasAlumno(idUser){
    this.routerServ.navigate(['/alumno/rutinas', idUser]);
  }

}
