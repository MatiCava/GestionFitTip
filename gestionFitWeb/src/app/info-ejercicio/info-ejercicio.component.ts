import { Component, OnInit } from '@angular/core';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info-ejercicio',
  templateUrl: './info-ejercicio.component.html',
  styleUrls: ['./info-ejercicio.component.css']
})
export class InfoEjercicioComponent implements OnInit {

  id:any;
  ejercicio;

  constructor(private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.ejercicio = {};
  }

  ngOnInit() {
    this.getInfoEjercicio();
  }

  getInfoEjercicio(){
    this.routineServ.getExercise(this.id).subscribe(
      result => {this.ejercicio = result},
      error => {console.log(error);}
      );
  }

  volverAtras(){
    this.router.navigate(['/ejercicios']);
  }

}
