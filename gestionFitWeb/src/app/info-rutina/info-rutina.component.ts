import { Component, OnInit } from '@angular/core';
import { Routine } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info-rutina',
  templateUrl: './info-rutina.component.html',
  styleUrls: ['./info-rutina.component.css']
})
export class InfoRutinaComponent implements OnInit {

  id:any;
  rutina;

  constructor(private translateService: TranslateService, private routineServ: RoutineService,  private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rutina = {};
  }

  ngOnInit() {
    this.getInfoRutina();
  }

  getInfoRutina(){
    this.routineServ.getRoutine(this.id).subscribe(
                      result => {this.rutina = result;console.log(result);},
                      error => {console.log(error);}
                      );
  }

  volverAtras(){
    this.router.navigate(['/rutinas']);
  }

}
