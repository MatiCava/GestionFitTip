import { Component, OnInit } from '@angular/core';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-editar-ejercicio',
  templateUrl: './../nuevo-ejercicio/nuevo-ejercicio.component.html',
  styleUrls: ['./editar-ejercicio.component.css']
})
export class EditarEjercicioComponent implements OnInit {

  form:FormGroup = this.formBuilder.group({
    id: new FormControl(),
    name: new FormControl('', Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
    type: new FormControl('', Validators.compose([
      Validators.required
    ])),
    description: new FormControl('', Validators.compose([
      Validators.minLength(14),
      Validators.required
    ])),
    isTemplate: new FormControl()
  })

  id:any;
  exercisesType=[];
  newExercise;
  isNew = false; 
  isEdit = true;
  isAsignar = false;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.newExercise={}; 
  }

  ngOnInit() {
    this.traerTiposEjercicio();
    this.traerEjercicio();
  }

  traerEjercicio(){
    this.routineServ.getExercise(this.id).subscribe(
      result => {this.asignarValoresAForm(result);},
      error => {console.log(error);}
      );
  }

  asignarValoresAForm(result){
    this.form.setValue(result);

  }

  traerTiposEjercicio(){
    this.routineServ.exerciseTypes().subscribe(
      result => {this.exercisesType= result},
      error => console.log(error)
    )
  }


  actualizarEjercicio(){

    this.routineServ.updateExercise(this.id, this.form.value).subscribe(
      res => {this.volverAtras();},
      error => {console.log(error);}
      )
    
  }

  volverAtras(){
    this.router.navigate(['/ejercicios']);
  }

}
