import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-ejercicios',
  templateUrl: './lista-ejercicios.component.html',
  styleUrls: ['./lista-ejercicios.component.css']
})
export class ListaEjerciciosComponent implements OnInit {

  exercises:any[];
  ejercicioSeleccionado:any = {};

  constructor(private translateService: TranslateService, private routineServ: RoutineService, private router: Router) { }

  ngOnInit() {
    this.traerEjercicios();
  }

  traerEjercicios(){
    this.routineServ.getExercisesTemplate().subscribe(
      result => {this.exercises = result;},
      error => {console.log(error);},
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
      result => {console.log(result);location.reload()},
      error => {console.log(error);}
    );
    this.ejercicioSeleccionado = {};
  }

}
