import { Component, OnInit } from '@angular/core';
import { Routine } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrls: ['./lista-rutinas.component.css']
})
export class ListaRutinasComponent implements OnInit {

  rutinas:any[];

  constructor(private routineServ: RoutineService, private router: Router) { }

  ngOnInit() {
    this.traerRutinas()
  }

  traerRutinas(){
  	this.routineServ.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }

  infoRoutine(idR){
    this.router.navigate(['/rutina/info', idR]);
  }

  editRoutine(idR){
    this.router.navigate(['/rutina/edit', idR]);
  }

  deleteRoutine(idR){

  }

}
