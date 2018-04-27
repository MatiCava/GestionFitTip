import { Component, OnInit, Input } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.component.html',
  styleUrls: ['./info-alumno.component.css'],
  providers: [ AlumnosService]
})
export class InfoAlumnoComponent implements OnInit {
  id: any;
  private alumno;

  constructor(private userServ: AlumnosService, private route: ActivatedRoute, private routerServ: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.alumno = {};
  }
  ngOnInit() {
    this.getInfoAlumno();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
    this.getInfoAlumno();
  }

  getInfoAlumno() {
    this.userServ.getUser(this.id).subscribe(
      user => {this.alumno = user; console.log(this.alumno); },
      err => {console.log(err); });
  }

  volver() {
    this.routerServ.navigate(['/alumnos']);
  }

}
