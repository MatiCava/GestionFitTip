import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './../services/alumnos/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  private alumnos:any;
  //id para pasar a child

  constructor(private userService: AlumnosService) {
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

}
