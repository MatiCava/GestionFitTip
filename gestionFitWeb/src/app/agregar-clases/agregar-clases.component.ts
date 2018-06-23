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
    clases : new FormControl(0,Validators.compose([
      Validators.required,Validators.min(1)
    ]))
  });

  dias=[{day:"MONDAY",startHour:"",endHour:"",checked:false,available:false,availableHours:[]},
  {day:"TUESDAY",startHour:"",endHour:"",checked:false,available:false,availableHours:[]},
  {day:"WEDNESDAY",startHour:"",endHour:"",checked:false,available:false,availableHours:[]},
  {day:"THURSDAY",startHour:"",endHour:"",checked:false,available:false,availableHours:[]},
  {day:"FRIDAY",startHour:"",endHour:"",checked:false,available:false,availableHours:[]},
  {day:"SATURDAY",startHour:"",endHour:"",checked:false,available:false,availableHours:[]}];
  diasElegidos = [];
  idUser:any;
  diasDisponibles= [];

  horas = [];
  puedeGuardar = true;
  elegidos = 0;

  constructor(private userServ : AlumnosService, private routerServ: Router,
     private formBuilder : FormBuilder,private route: ActivatedRoute, private spinner: NgxSpinnerService) {
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
    this.userServ.getInstructorDays().subscribe(
      res => {this.diasDisponibles = res;console.log(res);this.bloquearNoDisponibles()},
      error => console.log(error)
    );
  }

  bloquearNoDisponibles(){

    for(let dia of this.diasDisponibles){
      let diaNombre = dia.day;
      for(let diaCheck of this.dias){
        if(diaCheck.day === diaNombre){
          diaCheck.available = true;
          let horas = [];
          for(let hora of dia.startEndHours){
            let horaString = [];
            for(let i = hora.startHour; i < hora.endHour;i++){
              if(i < 10){
                horaString.push("0" + i + ":00");
              } else {
                horaString.push(i + ":00");
              }
            }
            horas.push(horaString);
          }
          console.log(horas);
          diaCheck.availableHours=(horas);

        }
      }
    }

  }

  setHorariosElegidos(user){
    console.log(user.remainingLessons === 0 || new Date().getTime() > new Date(user.lessonsExpires).getTime());
    this.form.controls.clases.setValue(user.remainingLessons);
    this.puedeGuardar = user.remainingLessons === 0 || new Date().getTime() > new Date(user.lessonsExpires).getTime(); 
    this.diasElegidos = this.changeHoursFormat(user.classDays);
    for(let day of this.diasElegidos){
      for(let dia of this.dias){
        if(dia.day === day.day){
          dia.checked = true;
          this.elegidos ++;
        }
      }
    }

  }

  changeHoursFormat(days){
    for(let day of days){
      if(day.startHour < 10){
        day.startHour = "0" + day.startHour + ":00";
      } else {
        day.startHour += ":00";
      }
      if(day.endHour < 10){
        day.endHour = "0" + day.endHour + ":00";
      } else {
        day.endHour += ":00";
      }
    }
    return days;
  }

  horaSeleccionada(hora,day){
    day.endHour = this.horas[this.horas.indexOf(hora)+1] ;
  }

  onSubmit(){
    this.spinner.show();
    this.setHorariosAInteger();
    this.userServ.addLessons(this.idUser,this.form.controls.clases.value,this.diasElegidos).subscribe(
      res => {this.routerServ.navigate(["/alumnos"]); this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();}
    )
  }

  setHorariosAInteger(){
    for(let dia of this.diasElegidos){
      dia.startHour = Number(dia.startHour.substring(0,2));
      dia.endHour = Number(dia.endHour.substring(0,2));
    }
  }

  cancel(){
    this.routerServ.navigate(["/alumnos"]);
  }

  validHours(){
    let valid = true;
    for(let dia of this.diasElegidos){
      valid = valid && dia.startHour != ""&& dia.endHour != "";
    }
    console.log(valid);
    return valid;
  }


  check(day){
    if(!day.checked){
      this.elegidos -= 1;
      this.diasElegidos.splice(this.diasElegidos.indexOf(day),1);

    }else{
      this.elegidos += 1;
      console.log(day);
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
