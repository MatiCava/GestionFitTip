import { Component, OnInit, Input } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { RoutineService } from '../services/routine/routine.service';

@Component({
  selector: 'app-rutinas-instructor',
  templateUrl: './rutinas-instructor.component.html',
  styleUrls: ['./rutinas-instructor.component.css']
})
export class RutinasInstructorComponent implements OnInit {

  @Input() id:any;
	rutinas: any[];
	rutinaAlumno:any[];

  constructor(private routineProvider: RoutineService, private userService: AlumnosService) { }

  ngOnInit() {
    this.traerRutinas();
  }

  guardarRutinasAlumno(){
    this.rutinaAlumno = this.rutinas.filter(ex => ex.checked == true);
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
