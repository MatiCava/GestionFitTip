import { Component, OnInit } from '@angular/core';
import { Routine } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrls: ['./lista-rutinas.component.css']
})
export class ListaRutinasComponent implements OnInit {

  rutinas:any[];
  rutinaSeleccionada:any = {};

  constructor(private translateService: TranslateService, private routineServ: RoutineService, private router: Router) { }

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

  seleccionar(rut){
    this.rutinaSeleccionada = rut;
  }

  eliminarRutina(){
    this.routineServ.deleteRoutine(this.rutinaSeleccionada.id).subscribe(
      result => {console.log(result);},
      error => {console.log(error);}
    );
    this.rutinaSeleccionada = {};
  }

}
