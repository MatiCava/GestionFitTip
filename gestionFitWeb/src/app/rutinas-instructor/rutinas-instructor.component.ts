import { Component, OnInit, Input } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { RoutineService } from '../services/routine/routine.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-rutinas-instructor',
  templateUrl: './rutinas-instructor.component.html',
  styleUrls: ['./rutinas-instructor.component.css']
})
export class RutinasInstructorComponent implements OnInit {

  id:any;
	rutinas: any[];
  rutinaAlumno:any[];
  

  constructor(private routineProvider: RoutineService, private userService: AlumnosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getId();
    this.traerRutinas();
  }

  getId(){
    this.route.paramMap.switchMap((params: ParamMap) => 
                                  params.get('id')).subscribe(
                                        res => {this.id = res;},
                                        error => {console.log(error);},
                                  );
  }

  guardarRutinasAlumno(){
    this.rutinaAlumno = this.rutinas.filter(ex => ex.checked == true);
    console.log(this.id);
    console.log(this.rutinaAlumno);
  	this.userService.updateRutines(this.id,this.rutinaAlumno).subscribe(
  			res => {console.log(res);},
  			error => {console.log(error);}
  			)
  }

  traerRutinas(){
  	this.routineProvider.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }
}
