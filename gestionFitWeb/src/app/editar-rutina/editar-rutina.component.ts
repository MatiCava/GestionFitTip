import { Component, OnInit } from '@angular/core';
import { Routine, Routine_Type } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-editar-rutina',
  templateUrl: './../nueva-rutina/nueva-rutina.component.html',
  styleUrls: ['./editar-rutina.component.css']
})
export class EditarRutinaComponent implements OnInit {

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


  id:any;
  exercises:any[];
  rutinasType=[];
  newRoutine;
  isNew = false; 
  isEdit = true;
  tieneEjercicios = false;
  errorArgumentos = false;


  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.newRoutine={};
  }

  ngOnInit() {
    this.getRutina();
    this.traerTipos();
    this.traerEjercicios();
    console.log(this.newRoutine.exercises); 
  }

  traerEjercicios(){
    this.routineServ.getExercises().subscribe(
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
    this.newRoutine = result;
    this.form.get('name').setValue(this.newRoutine.name);
    this.form.get('type').setValue(this.newRoutine.type);
    this.form.get('exercises').setValue(this.newRoutine.exercises);
    this.tieneEjercicios = this.newRoutine.exercises != null;
    console.log(this.newRoutine);
  }

  asignarValoresDeForm(){
    this.newRoutine.name = this.form.controls.name.value;
    this.newRoutine.type = this.form.controls.type.value;
    this.newRoutine.exercises = this.form.controls.exercises.value;
  }

  actualizarRutina(){
    this.asignarValoresDeForm();
    console.log(this.newRoutine);
    this.routineServ.updateRoutine(this.id, this.newRoutine).subscribe(
      res => {console.log(res);this.volverAtras();},
      error => {{if(error.status == 406){this.errorArgumentos = true};}}
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

  volverAtras(){
    this.router.navigate(['/rutinas']);
  }
}
