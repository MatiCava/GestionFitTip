import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nuevo-instructor',
  templateUrl: './nuevo-instructor.component.html',
  styleUrls: ['./nuevo-instructor.component.css']
})
export class NuevoInstructorComponent implements OnInit {

  public instructor : FormGroup = this.formBuilder.group({
    username: new FormControl('',Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
  password: new FormControl('',Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
  nameAndSurname: new FormControl('',Validators.compose([
      Validators.minLength(6),
      Validators.required
    ])),
  mail: new FormControl('',Validators.compose([
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      Validators.required
    ])),
    role: new FormControl(),
    classes: new FormControl()
  });

  constructor(private userServ: AlumnosService,private formBuilder:FormBuilder,private router : Router,
  private spinner: NgxSpinnerService) {
    this.instructor.controls.role.setValue("INSTRUCTOR");
    this.instructor.controls.classes.setValue([]);
   }

  saveInstructor(){
    this.spinner.show();
    this.userServ.addNewInstructor(this.instructor.value).subscribe(
      res => {this.router.navigate(['/instructores']);this.spinner.hide(); },
      error => {console.log(error);this.spinner.hide() }
    );

  }

  ngOnInit() {
  }

}
