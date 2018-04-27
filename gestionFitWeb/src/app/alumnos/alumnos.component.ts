import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './../services/alumnos/alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  private alumnos:any;
  

  constructor(private userService: AlumnosService, private routerServ: Router) {
    this.alumnos = [];
   }

  ngOnInit() {
    this.getAlumnos();
  }


  getAlumnos(){
  	this.userService.getUsersStudents().subscribe(
  		res => {this.alumnos = res;console.log(res)},
  		error => {console.log(error)}
  		);
  }

  rutinasAlumno(idUser){
    this.routerServ.navigate(['/alumno/nuevaRutina', idUser]);
  }

}
