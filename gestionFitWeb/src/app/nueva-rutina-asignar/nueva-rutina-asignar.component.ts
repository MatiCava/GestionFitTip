import { Component, OnInit, Input, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RoutineService } from '../services/routine/routine.service';
import { NuevoEjercicioAsignarComponent } from '../nuevo-ejercicio-asignar/nuevo-ejercicio-asignar.component';

@Component({
  selector: 'app-nueva-rutina-asignar',
  templateUrl: '../nueva-rutina/nueva-rutina.component.html',
  styleUrls: ['../nueva-rutina/nueva-rutina.component.css']
})
export class NuevaRutinaAsignarComponent implements OnInit {

  @Input() rutinaAEditar:any;
  @ViewChild(NuevoEjercicioAsignarComponent) ejercicioComponent: NuevoEjercicioAsignarComponent;
  @ViewChildren(NuevoEjercicioAsignarComponent) ejerciciosEdit: QueryList<NuevoEjercicioAsignarComponent>;

  public form:FormGroup = this.formBuilder.group({
    id: new FormControl(),
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
  public newRoutine;
  isEdit = false;
  isNew = false;
  isAsignar = true;
  tieneEjercicios = false; 
  errorArgumentos = false;
  isTemplate = false;
  searchText:any;

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private routineServ: RoutineService) {
    
      this.newRoutine = {name:"",isTemplate:false, creationDate:new Date().getTime(), type:"", exercises:[]};
      this.form.controls.isTemplate.setValue(false);
      this.form.controls.creationDate.setValue(new Date().getTime());
      this.form.controls.exercises.setValue([]);
    


  }

  ngOnInit() {
    console.log(this.rutinaAEditar);
    if(this.rutinaAEditar != null){
      this.form.setValue(this.rutinaAEditar);
      console.log(this.form.controls.exercises.value.length > 0);
      this.tieneEjercicios = this.form.controls.exercises.value.length > 0;
    }
    this.traerEjercicios();
    this.traerTipos();
  }


  traerTipos(){
    this.routineServ.routineTypes().subscribe(
      result => {this.rutinasType= result;},
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

  	
  }

  agregarEjercicio(ejercicio){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    ejercicio.id = null;
    ejercicio.isTemplate = false;
    this.form.controls.exercises.value.push(ejercicio);
  }

  eliminarEjercicio(ejercicio){
    this.form.controls.exercises.value.splice(ejercicio, 1);
    
  }

  agregarEjercicioEditado(id){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    this.form.controls.exercises.value.push(this.ejerciciosEdit.toArray()[id].form.value);
  }

    agregarEjercicioNuevo(){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    this.form.controls.exercises.value.push(this.ejercicioComponent.form.value);
  }


}