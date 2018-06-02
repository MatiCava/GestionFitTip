import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NuevoEjercicioAsignarComponent } from '../nuevo-ejercicio-asignar/nuevo-ejercicio-asignar.component';
import { NuevoEjercicioComponent } from '../nuevo-ejercicio/nuevo-ejercicio.component';

@Component({
  selector: 'app-nueva-rutina',
  templateUrl: './nueva-rutina.component.html',
  styleUrls: ['./nueva-rutina.component.css']
}) 
export class NuevaRutinaComponent implements OnInit {

  @ViewChild(NuevoEjercicioAsignarComponent) ejercicioComponent: NuevoEjercicioAsignarComponent;
  @ViewChildren(NuevoEjercicioAsignarComponent) ejerciciosEdit: QueryList<NuevoEjercicioAsignarComponent>;

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
    ])),
    isTemplate: new FormControl(),
    creationDate: new FormControl()
  })

  exercises:any[];
	exercisesAlumno:any[] = [];
	rutinasType=[];
  newRoutine;
  isAsignar = false;
  isEdit = false;
  isNew = true;
  tieneEjercicios = false; 
  errorArgumentos = false;
  isTemplate = true;
  searchText:any;
  nuevoEjercicio:boolean=false;

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private routineServ: RoutineService, private router: Router) {
    this.newRoutine = {name:"",isTemplate:true, creationDate:new Date().getTime(), type:"", exercises:[]};
    this.form.controls.isTemplate.setValue(true);
    this.form.controls.creationDate.setValue(new Date().getTime());
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



  guardarRutina(){

    console.log(this.newRoutine);
    this.routineServ.saveRoutine(this.form.value).subscribe(
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
    this.form.controls.exercises.setValue(this.newRoutine.exercises);
    
  }

  agregarEjercicioEditado(id){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    this.newRoutine.exercises.push(this.ejerciciosEdit.toArray()[id].form.value);
    this.form.controls.exercises.setValue(this.newRoutine.exercises);
  }

  agregarEjercicioNuevo(){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    this.newRoutine.exercises.push(this.ejercicioComponent.form.value);
    this.form.controls.exercises.setValue(this.newRoutine.exercises);
  }


  

}
