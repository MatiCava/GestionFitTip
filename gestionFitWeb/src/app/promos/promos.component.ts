import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './../services/alumnos/alumnos.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { NgxInputFileUploadComponent } from 'ngx-input-file-upload'

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

  private NgxInputFileUploadComponent: NgxInputFileUploadComponent;
  newPromo;
  acceptHtml="image/*"
  acceptTs=/image-*/
  activeColor: string = '#3366CC';
  formPromo:FormGroup = this.formBuilder.group({
    matter: new FormControl('', Validators.compose([
      Validators.minLength(10),
      Validators.required
    ])),
    body: new FormControl('', Validators.compose([
      Validators.minLength(20),
      Validators.required
    ]))
  })

  constructor(private formBuilder: FormBuilder, private alumnosServ: AlumnosService, private router: Router) {
    this.newPromo = {matter:"", body:"", photo:""};
   }

  ngOnInit() {
  }

  validForm(){
    console.log(this.formPromo.controls.matter.value);
    console.log(this.formPromo.controls.body.value);
    console.log(this.NgxInputFileUploadComponent.imageSrc);
    this.newPromo.matter = this.formPromo.controls.matter.value;
    this.newPromo.body = this.formPromo.controls.body.value;
    this.newPromo.photo = this.NgxInputFileUploadComponent.imageSrc;
  }

  enviarPromo(){
    this.validForm();
    this.alumnosServ.sendPromo(this.newPromo);
  }

  volverAtras(){
    this.router.navigate(['/ejercicios']);
  }
}
