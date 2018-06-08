import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-ejercicios',
  templateUrl: './lista-ejercicios.component.html',
  styleUrls: ['./lista-ejercicios.component.css']
})
export class ListaEjerciciosComponent implements OnInit {

  exercises:any[];
  ejercicioSeleccionado:any = {};

  constructor(private translateService: TranslateService, private routineServ: RoutineService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.traerEjercicios();
  }

  traerEjercicios(){
    this.spinner.show();
    this.routineServ.getExercisesTemplate().subscribe(
      result => {this.exercises = result;this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();},
      )
  }

  infoExercise(idE){
    this.router.navigate(['/ejercicio/info', idE]);
  }

  editExercise(idE){
    this.router.navigate(['/ejercicio/edit', idE]);
  }

  seleccionar(ex){
    this.ejercicioSeleccionado = ex;
  }

  eliminarEjercicio(){
    this.routineServ.deleteExercise(this.ejercicioSeleccionado.id).subscribe(
      result => {location.reload()},
      error => {console.log(error);}
    );
    this.ejercicioSeleccionado = {};
  }

}
