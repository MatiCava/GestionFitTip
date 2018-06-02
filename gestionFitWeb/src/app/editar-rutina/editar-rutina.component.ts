import { Component, OnInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { NuevoEjercicioAsignarComponent } from '../nuevo-ejercicio-asignar/nuevo-ejercicio-asignar.component';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './../nueva-rutina/nueva-rutina.component.html',
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {

  @ViewChild(NuevoEjercicioAsignarComponent) ejercicioComponent: NuevoEjercicioAsignarComponent;
  @ViewChildren(NuevoEjercicioAsignarComponent) ejerciciosEdit: QueryList<NuevoEjercicioAsignarComponent>;

  form:FormGroup = this.formBuilder.group({
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


  id:any;
  exercises:any[];
  rutinasType=[];
  newRoutine;
  isNew = false; 
  isEdit = true;
  isAsignar = false;
  tieneEjercicios = false;
  errorArgumentos = false;
  searchText:any;


  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.newRoutine={};

  }

  ngOnInit() {
    this.getRutina();
    this.traerTipos();
    this.traerEjercicios();
  }

  traerEjercicios(){
    this.routineServ.getExercisesTemplate().subscribe(
              result => {this.exercises = result;},
              error => {console.log(error);},
              )
  }

  traerTipos(){
    this.routineServ.routineTypes().subscribe(
      result => {console.log(result);this.rutinasType= result;},
      error => console.log(error)
    )
  }

  getRutina(){
    this.routineServ.getRoutine(this.id).subscribe(
      result => {this.asignarValoresAForm(result);},
      error => {console.log(error);}
      );
  }

  asignarValoresAForm(result){
    this.form.setValue(result);
    this.tieneEjercicios = this.form.controls.exercises.value != null;
  }



  actualizarRutina(){
    this.routineServ.updateRoutine(this.id, this.form.value).subscribe(
      res => {this.volverAtras();},
      error => {{if(error.status == 406){this.errorArgumentos = true};}}
      )
    
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

  volverAtras(){
    this.router.navigate(['/rutinas']);
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
