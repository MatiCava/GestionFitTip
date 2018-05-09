import { Component, OnInit } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './../nueva-rutina/nueva-rutina.component.html',
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {

  id:any;
  exercises:any[];
  rutinasType=[Routine_Type[4], Routine_Type[3], Routine_Type[2], Routine_Type[1], Routine_Type[0]];
  newRoutine;
  isNew = false; 
  isEdit = true;
  

  constructor(private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.newRoutine = {};
  }

  ngOnInit() {
    this.getRutina();
    this.traerEjercicios();
    this.marcarEjercicios();
    console.log(this.newRoutine.exercises); 
  }

  marcarEjercicios(){

  }

  traerEjercicios(){
    this.routineServ.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  }

  getRutina(){
    this.routineServ.getRoutine(this.id).subscribe(
      result => {this.newRoutine = result;},
      error => {console.log(error);}
      );
  }

  actualizarRutina(){

  }

  volverAtras(){
    this.router.navigate(['/rutinas']);
  }
}
