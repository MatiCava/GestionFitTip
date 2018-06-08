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
  private alumno;

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
      user => {this.alumno = user;this.spinner.hide();},
      err => {console.log(err); this.spinner.hide();});
  }

  volver() {
    this.routerServ.navigate(['/alumnos']);
  }

}
