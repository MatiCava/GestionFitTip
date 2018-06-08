import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LOCALE_DATA } from '@angular/common/src/i18n/locale_data';
import { getLocaleDayNames } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agregar-clases',
  templateUrl: './agregar-clases.component.html',
  styleUrls: ['./agregar-clases.component.css'],
  providers: [AlumnosService]
})
export class AgregarClasesComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    clases : new FormControl({value:0,disabled:true},Validators.compose([
      Validators.required,Validators.min(1)
    ]))
  });

  dias=[{day:"MONDAY",startHour:"",endHour:"",checked:false},{day:"TUESDAY",startHour:"",endHour:"",checked:false},{day:"WEDNESDAY",startHour:"",endHour:"",checked:false},{day:"THURSDAY",startHour:"",endHour:"",checked:false},{day:"FRIDAY",startHour:"",endHour:"",checked:false},{day:"SATURDAY",startHour:"",endHour:"",checked:false}];
  diasElegidos = [];
  idUser:any;

  horas = [];
  puedeGuardar = true;
  elegidos = 0;

  constructor(private userServ : AlumnosService, private routerServ: Router, private formBuilder : FormBuilder,private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.idUser = this.route.snapshot.paramMap.get("idUser");
   }

  ngOnInit() {
    for(let i = 8;i<22;i++){
      if(i<10){
        this.horas.push('0'+i+':00');
      }
      else{
        this.horas.push(i+':00');
      }
    }
    this.userServ.getUser(this.idUser).subscribe(res => this.setHorariosElegidos(res) ,error => console.log(error));
    
  }

  setHorariosElegidos(user){
    console.log(user.remainingLessons === 0 || new Date().getTime() > new Date(user.lessonsExpires).getTime());
    this.form.controls.clases.setValue(user.remainingLessons);
    this.puedeGuardar = user.remainingLessons === 0 || new Date().getTime() > new Date(user.lessonsExpires).getTime(); 
    this.diasElegidos = user.classDays;
    for(let day of this.diasElegidos){
      for(let dia of this.dias){
        if(dia.day === day.day){
          dia.checked = true;
          this.elegidos ++;
        }
      }
    }

  }

  horaSeleccionada(hora,day){
    day.endHour = this.horas[this.horas.indexOf(hora)+1] ;
    console.log(this.diasElegidos);
  }

  onSubmit(){
    this.spinner.show();
    this.userServ.addLessons(this.idUser,this.form.controls.clases.value,this.diasElegidos).subscribe(
      res => {this.routerServ.navigate(["/alumnos"]); this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();}
    )
  }

  cancel(){
    this.routerServ.navigate(["/alumnos"]);
  }


  check(day){
    console.log(this.dias);
    console.log(day.checked);
    if(!day.checked){
      this.elegidos -= 1;
      this.diasElegidos.splice(this.diasElegidos.indexOf(day),1);

    }else{
      this.elegidos += 1;
      this.diasElegidos.push(day);

    }
    if(this.elegidos == 0){
      this.form.controls.clases.setValue(0);
    }
    if(this.elegidos == 1){
      this.form.controls.clases.setValue(4);
    }
    if(this.elegidos == 2){
      this.form.controls.clases.setValue(8);
    }
  }

  limit(day){
    return (this.elegidos >= 2 && !day.checked);
  }

}
