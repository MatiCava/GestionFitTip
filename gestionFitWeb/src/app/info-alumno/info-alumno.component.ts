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
  public pieChartData:number[] = [0,100];
  public pieChartType:string = 'pie';
  private alumno;
  colors:any[] = [
    { // first color
      backgroundColor: 'rgba(66, 244, 116,0.2)',
      borderColor: 'rgba(66, 244, 116,0.2)',
      pointBackgroundColor: 'rgba(66, 244, 116,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(66, 244, 116,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  constructor(private translateService: TranslateService, private userServ: AlumnosService, private route: ActivatedRoute, private routerServ: Router, private spinner: NgxSpinnerService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.alumno = {};
  }
  ngOnInit() {
    this.getInfoAlumno();

  }



  getInfoAlumno() {
    this.spinner.show();
    this.userServ.getUser(this.id).subscribe(
      user => {this.alumno = user;this.spinner.hide();
        this.asistencia = this.alumno.assistance;
        this.inasistencia = 100 - this.alumno.assistance;
        this.logs = this.alumno.daysAssisted;
        console.log(this.alumno.daysAssisted);
        console.log(this.alumno.assistance);
        this.setCharData();
      },
      err => {console.log(err); this.spinner.hide();});


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
