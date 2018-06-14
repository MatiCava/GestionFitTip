import { Component, OnInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators, AbstractControl} from '@angular/forms';
import { NuevoEjercicioAsignarComponent } from '../nuevo-ejercicio-asignar/nuevo-ejercicio-asignar.component';
import { NgxSpinnerService } from 'ngx-spinner';

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
    exercises: new FormControl([], Validators.compose([
      Validators.required,
      this.minLengthArray(1)
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
  ejercicioAgregado=false;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.newRoutine={};

  }

  minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
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

  isValidEx(indx){
    return this.ejerciciosEdit.toArray()[indx] != null && this.ejerciciosEdit.toArray()[indx].form.valid
  }

  getRutina(){
    this.spinner.show();
    this.routineServ.getRoutine(this.id).subscribe(
      result => {this.asignarValoresAForm(result);this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();}
      );
  }

  asignarValoresAForm(result){
    this.form.setValue(result);
    this.tieneEjercicios = this.form.controls.exercises.value != null;
  }



  actualizarRutina(){
    this.spinner.show();
    this.routineServ.updateRoutine(this.id, this.form.value).subscribe(
      res => {this.volverAtras();this.spinner.hide();},
      error => {{if(error.status == 406){this.errorArgumentos = true};}this.spinner.hide();}
      )
    
  }

  agregarEjercicio(ejercicio){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    ejercicio.id = null;
    ejercicio.isTemplate = false;
    console.log(this.form.controls.exercises.value);
    let newEx = this.form.controls.exercises.value;
    newEx.push(ejercicio);
    this.form.controls.exercises.setValue(newEx);
    this.ejercicioAgregado = true;
    setTimeout(() => {this.ejercicioAgregado = false; }, 2000);
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
    let newEx = this.form.controls.exercises.value;
    newEx.push(this.ejerciciosEdit.toArray()[id].form.value);
    this.form.controls.exercises.setValue(newEx);
    this.ejercicioAgregado = true;
    setTimeout(() => {this.ejercicioAgregado = false; }, 2000);
  }

    agregarEjercicioNuevo(){
    if(!this.tieneEjercicios){
      this.tieneEjercicios=true;
    }
    let newEx = this.form.controls.exercises.value;
    newEx.push(this.ejercicioComponent.form.value);
    this.form.controls.exercises.setValue(newEx);
    this.ejercicioComponent.form.reset();
    this.ejercicioAgregado = true;
    setTimeout(() => {this.ejercicioAgregado = false; }, 2000);
  }
}
