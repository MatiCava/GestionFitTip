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
      Validators.required
    ])),
    exercises: new FormControl('', Validators.compose([
      Validators.required
    ]))
  })

  exercises:any[];
	exercisesAlumno:any[] = [];
	rutinasType=[];
  newRoutine;
  isEdit = false;
  isNew = true;
  tieneEjercicios = false; 
  errorArgumentos = false;
  isTemplate = true;

  constructor(private formBuilder: FormBuilder, private routineServ: RoutineService, private router: Router) {
    this.newRoutine = {name:"",isTemplate:true, creationDate:new Date().getTime(), type:"", exercises:[]};
  }

  ngOnInit() {
    this.traerEjercicios();
    this.traerTipos();
  }


  volverAtras(){
    this.router.navigate(['/rutinas']);
  }

  traerTipos(){
    this.routineServ.routineTypes().subscribe(
      result => {console.log(result);this.rutinasType= result;},
      error => console.log(error)
    )
  }

  traerEjercicios(){
    this.routineServ.getExercises().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  }


  validForm(){
    this.newRoutine.type = this.form.controls.type.value;
    this.newRoutine.name = this.form.controls.name.value;
  }

  guardarRutina(){
    this.validForm();
  	//let type = Routine_Type[this.newRoutine.type];
    //this.newRoutine.type = type;
    this.newRoutine.isTemplate = this.isTemplate;
    console.log(this.newRoutine);
    this.routineServ.saveRoutine(this.newRoutine).subscribe(
  			res => {console.log(res);this.volverAtras();},
  			error => {if(error.status == 406){this.errorArgumentos = true};}
  			)
  	
  }

  agregarEjercicio(ejercicio){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    this.newRoutine.exercises.push(ejercicio);
  }

  eliminarEjercicio(ejercicio){
    console.log(ejercicio);
    console.log(this.newRoutine.exercises.splice(ejercicio, 1));
    console.log(this.newRoutine.exercises);
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
