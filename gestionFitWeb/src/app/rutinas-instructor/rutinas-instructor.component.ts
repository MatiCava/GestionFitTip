import { Component, OnInit, Input, ViewChild, ViewChildren,QueryList, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { RoutineService } from '../services/routine/routine.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/switchMap';
import { NuevaRutinaAsignarComponent } from '../nueva-rutina-asignar/nueva-rutina-asignar.component';

@Component({
  selector: 'app-rutinas-instructor',
  templateUrl: './rutinas-instructor.component.html',
  styleUrls: ['./rutinas-instructor.component.css'],
  providers: [RoutineService]
})
export class RutinasInstructorComponent implements OnInit,AfterViewChecked{

  @ViewChild(NuevaRutinaAsignarComponent) rutinaComponent: NuevaRutinaAsignarComponent
  @ViewChildren(NuevaRutinaAsignarComponent) rutinasEdits: QueryList<NuevaRutinaAsignarComponent>

  id:any;
	rutinas: any[];
  rutinaAlumno:any[];
  tieneRutinas:boolean = false;
  nuevaRutina:boolean= false;
  searchText:any;
  

  constructor(private translateService: TranslateService, private routineProvider: RoutineService, private userService: AlumnosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getId();
    this.traerRutinas();
  }

  ngAfterViewChecked(){
    //console.log(this.rutinasEdits.length);

  }

  print(){
    console.log(this.rutinasEdits.length);
  }

  getId(){
    this.route.paramMap.switchMap((params: ParamMap) => 
                                  params.get('id')).subscribe(
                                        res => {this.id = res;this.getRutinasAlumno(res);},
                                        error => {console.log(error);},
                                  );
  }

  getRutinasAlumno(id){
    this.userService.getRutines(id).subscribe(
      res => {this.rutinaAlumno = res;this.tieneRutinas = this.rutinaAlumno.length >= 1;},
      error => console.log(error)
    );
  }

  guardarRutinasAlumno(){
    console.log(this.id);
    console.log(this.rutinaAlumno);
  	this.userService.updateRutines(this.id,this.rutinaAlumno).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
        )
    this.volverAtras();
  }

  agregarRutina(rutina){
    if(!this.tieneRutinas){
      this.tieneRutinas=true;
    }
    rutina.id = null;
    rutina.isTemplate = false;
    this.rutinaAlumno.push(rutina);
  }

  agregarRutinaNueva(){
    console.log(this.rutinaComponent.form.value);
    if(!this.tieneRutinas){
      this.tieneRutinas=true;
    }
    this.rutinaAlumno.push(this.rutinaComponent.form.value);
  }

  agregarRutinaEditada(id){
    console.log(this.rutinasEdits.toArray()[id]);
    this.rutinaAlumno.push(this.rutinasEdits.toArray()[id].form.value);

  }

  traerRutinas(){
  	this.routineProvider.getRutinesTemplates().subscribe(
  						result => {this.rutinas = result;console.log(this.rutinasEdits.length);},
  						error => {console.log(error);},
  						)
  }

  volverAtras(){
    this.router.navigate(['/alumnos']);
  }
}
