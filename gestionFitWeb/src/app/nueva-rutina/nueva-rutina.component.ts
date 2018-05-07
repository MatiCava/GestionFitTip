import { Component, OnInit } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nueva-rutina',
  templateUrl: './nueva-rutina.component.html',
  styleUrls: ['./nueva-rutina.component.css']
}) 
export class NuevaRutinaComponent implements OnInit {

  form:FormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
    type: new FormControl('', Validators.compose([
      Validators.nullValidator,
      Validators.required
    ])),
    exercises: new FormControl('', Validators.compose([
      Validators.nullValidator,
      Validators.required
    ]))
  })

  exercises:any[];
	exercisesAlumno:any[] = [];
	rutinasType=[Routine_Type[4], Routine_Type[3], Routine_Type[2], Routine_Type[1], Routine_Type[0]];
  newRoutine;
  isEdit = false;
  isNew = true;

  constructor(private formBuilder: FormBuilder, private routineServ: RoutineService, private router: Router) {
    this.newRoutine = {name:"", creationDate:new Date().getTime(), type:"", exercises:[]};
  }

  ngOnInit() {
    this.traerEjercicios();
  }

  volverAtras(){
    this.router.navigate(['/alumnos']);
  }

  traerEjercicios(){
    this.routineServ.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  }

  guardarEjercicios(){
  	this.exercisesAlumno = this.exercises.filter(ex => ex.checked == true);
  	console.log(this.exercisesAlumno);
  	this.newRoutine.exercises = this.exercisesAlumno;
  }

  guardarRutina(){
    //this.validForm();
  	let type = Routine_Type[this.newRoutine.type];
    this.newRoutine.type = type;
    this.guardarEjercicios();
    console.log(this.newRoutine);
    this.routineServ.saveRoutine(this.newRoutine).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  	this.volverAtras();
  }
  
  /* guardo html viejo por si no funca 

    <div class="container" style="padding-top: 35px;">
  <ul class="list-group">
      <li class="list-group-item">
          <div class="form-group">
            <h1 style="text-align: left; font-family: Poppins, sans-serif; font-size:25px">Nombre rutina</h1>
            <input type="text" class="form-control" [(ngModel)]="newRoutine.name">
          </div>
      </li>
      <li class="list-group-item">
          <h1 style="text-align: left; font-family: Poppins, sans-serif; font-size:25px">Tipo rutina</h1>
          <div class="styled-select rounded">
              <select [(ngModel)]="newRoutine.type" class="form-control">
                <option *ngFor="let typeR of rutinasType" [value]="typeR"> {{typeR | translate}} </option>
              </select>
          </div>
      </li>
      <li class="list-group-item" *ngFor="let exercise of exercises">
          <input id="checkboxEjercicios" type="checkbox" [(ngModel)]="exercise.checked"> {{exercise.name}}<br>
      </li>
  </ul>
  <div *ngIf="isNew" class="flex" style="padding-top: 25px;">
      <button class="btn btn-primary" (click)="guardarRutina()"> Guardar </button>
      <button class="btn btn-primary" (click)="volverAtras()"> Cancelar </button>
  </div>
  <div *ngIf="isEdit" class="flex" style="padding-top: 25px;">
        <button class="btn btn-primary" (click)="actualizarRutina()"> Actualizar </button>
        <button class="btn btn-primary" (click)="volverAtras()"> Cancelar </button>
    </div>  
</div>

  */
}
