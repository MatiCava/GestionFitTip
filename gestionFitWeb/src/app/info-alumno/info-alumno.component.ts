import { Component, OnInit, Input } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.component.html',
  styleUrls: ['./info-alumno.component.css'],
  providers: [ AlumnosService]
})
export class InfoAlumnoComponent implements OnInit {
  id: any;
  asistencia;
  inasistencia;
  logs:any[];
  public pieChartLabels:string[] = ['Asistencia', 'Inasistencia'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  private alumno;

  constructor(private translateService: TranslateService, private userServ: AlumnosService, private route: ActivatedRoute, private routerServ: Router, private spinner: NgxSpinnerService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.alumno = {};
  }
  ngOnInit() {
    this.getInfoAlumno();
    this.setCharData();
  }



  getInfoAlumno() {
    this.spinner.show();
    this.userServ.getUser(this.id).subscribe(
      user => {this.alumno = user;this.spinner.hide();},
      err => {console.log(err); this.spinner.hide();});

      this.asistencia = this.alumno.assistance;
      this.inasistencia = 100 - this.alumno.assistance;
      this.logs = this.alumno.daysAssisted;
      console.log(this.alumno.daysAssisted);
      console.log(this.alumno.assistance);
  }

  setCharData(){
    this.pieChartData = [this.asistencia, this.inasistencia];
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  volver() {
    this.routerServ.navigate(['/alumnos']);
  }

}
