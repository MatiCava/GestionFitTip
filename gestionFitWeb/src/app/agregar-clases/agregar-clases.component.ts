import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agregar-clases',
  templateUrl: './agregar-clases.component.html',
  styleUrls: ['./agregar-clases.component.css'],
  providers: [AlumnosService]
})
export class AgregarClasesComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    clases : new FormControl('',Validators.compose([
      Validators.required,Validators.min(1)
    ]))
  });

  idUser:any;

  constructor(private userServ : AlumnosService, private routerServ: Router, private formBuilder : FormBuilder,private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.idUser = this.route.snapshot.paramMap.get("idUser");
   }

  ngOnInit() {
  }

  onSubmit(){
    this.spinner.show();
    this.userServ.addLessons(this.idUser,this.form.controls.clases.value).subscribe(
      res => {this.routerServ.navigate(["/alumnos"]);this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();}
    )
  }

  cancel(){
    this.routerServ.navigate(["/alumnos"]);
  }

}
