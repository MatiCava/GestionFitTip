import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-instructor',
  templateUrl: './info-instructor.component.html',
  styleUrls: ['./info-instructor.component.css']
})
export class InfoInstructorComponent implements OnInit {

  id: any;
  private instructor;

  constructor(private translateService: TranslateService, private userServ: AlumnosService,
     private route: ActivatedRoute, private routerServ: Router, private spinner: NgxSpinnerService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.instructor= {};
  }
  ngOnInit() {
    this.getInfoInstructor();
  }



  getInfoInstructor() {
    this.spinner.show();
    this.userServ.getUser(this.id).subscribe(
      user => {this.instructor = user;this.spinner.hide();},
      err => {console.log(err); this.spinner.hide();});
  }

  volver() {
    this.routerServ.navigate(['/instructores']);
  }

}
