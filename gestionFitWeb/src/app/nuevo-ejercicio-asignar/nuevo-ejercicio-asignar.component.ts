import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RoutineService } from '../services/routine/routine.service';
import { Router } from '@angular/router';
import { Exercise_Type } from '../model/exercise';

@Component({
  selector: 'app-nuevo-ejercicio-asignar',
  templateUrl: '../nuevo-ejercicio/nuevo-ejercicio.component.html',
  styleUrls: ['../nuevo-ejercicio/nuevo-ejercicio.component.css']
})
export class NuevoEjercicioAsignarComponent implements OnInit {

  @Input() ejercicioAEditar:any;

  form:FormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
    type: new FormControl('', Validators.compose([
      Validators.required
    ])),
    description: new FormControl('', Validators.compose([
      Validators.minLength(1),
      Validators.required
    ])),
    isTemplate: new FormControl()
  })

  exercisesType=[];
  newExercise;
  isAsignar = false;
  isEdit = false;
  isNew = true;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private routineServ: RoutineService, private router: Router) {
    this.newExercise = {name:"", description:"", type:"",isTemplate : false};
    this.form.controls.type.setValue(false);
  }

  ngOnInit() {

    this.traerTiposEjercicio();
    if(this.ejercicioAEditar != null){
      this.form.controls.name.setValue(this.ejercicioAEditar.name);
      this.form.controls.type.setValue(this.ejercicioAEditar.type);
      this.form.controls.description.setValue(this.ejercicioAEditar.description);
      
    }
  }

  traerTiposEjercicio(){
    this.routineServ.exerciseTypes().subscribe(
      result => {this.exercisesType= result},
      error => console.log(error)
    )
  }

  volverAtras(){

  }

  validForm(){
    this.newExercise.type = this.form.controls.type.value;
    this.newExercise.name = this.form.controls.name.value;
    this.newExercise.description = this.form.controls.description.value;
  }

  guardarEjercicio(){

  }

  actualizarEjercicio(){
    
  }
}
