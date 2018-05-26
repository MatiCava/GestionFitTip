import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './../services/alumnos/alumnos.service';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private alumnosServ: AlumnosService, private router: Router) { }

  ngOnInit() {
  }

  enviarPromo(){
    console.log(this.formPromo.controls.matter.value);
    console.log(this.formPromo.controls.body.value);
    var list = [this.formPromo.controls.matter.value,this.formPromo.controls.body.value];
    this.alumnosServ.sendPromo(list);
  }

  volverAtras(){
    this.router.navigate(['/ejercicios']);
  }
}
