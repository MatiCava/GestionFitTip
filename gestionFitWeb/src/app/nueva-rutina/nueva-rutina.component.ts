import { Component, OnInit } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private routineServ: RoutineService, private router: Router) {
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
    this.routineServ.getExercisesTemplate().subscribe(
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
    ejercicio.id = null;
    ejercicio.isTemplate = false;
    this.newRoutine.exercises.push(ejercicio);
    this.form.controls.exercises.setValue(this.newRoutine.exercises);
  }

  eliminarEjercicio(ejercicio){
    this.newRoutine.exercises.splice(ejercicio, 1);
    
  }
  

}
