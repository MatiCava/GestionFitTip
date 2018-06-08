import { Component, OnInit } from '@angular/core';
import { Routine } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrls: ['./lista-rutinas.component.css']
})
export class ListaRutinasComponent implements OnInit {

  rutinas:any[];
  rutinaSeleccionada:any = {};

  constructor(private translateService: TranslateService, private routineServ: RoutineService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.traerRutinas()
  }

  traerRutinas(){
    this.spinner.show();
  	this.routineServ.getRutinesTemplates().subscribe(
  						result => {this.rutinas = result;this.spinner.hide();},
  						error => {console.log(error);this.spinner.hide();},
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
      result => {location.reload()},
      error => {console.log(error);}
    );
    this.rutinaSeleccionada = {};
  }

}
