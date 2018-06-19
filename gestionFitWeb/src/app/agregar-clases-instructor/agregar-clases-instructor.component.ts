import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agregar-clases-instructor',
  templateUrl: './agregar-clases-instructor.component.html',
  styleUrls: ['./agregar-clases-instructor.component.css']
})
export class AgregarClasesInstructorComponent implements OnInit {

  dias=[{day:"MONDAY",startHour:"",endHour:"",checked:false},
  {day:"TUESDAY",startHour:"",endHour:"",checked:false},
  {day:"WEDNESDAY",startHour:"",endHour:"",checked:false},
  {day:"THURSDAY",startHour:"",endHour:"",checked:false},
  {day:"FRIDAY",startHour:"",endHour:"",checked:false},
  {day:"SATURDAY",startHour:"",endHour:"",checked:false}];
  diasElegidos = [];
  idUser:any;

  horas = [];
  puedeGuardar = true;
  elegidos = 0;

  constructor(private userServ: AlumnosService, private routerServ: Router,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.idUser = this.route.snapshot.paramMap.get("id");
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
    this.userServ.addLessonsInstructor(this.idUser,this.diasElegidos).subscribe(
      res => {this.routerServ.navigate(["/instructores"]); this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();}
    )
  }

  cancel(){
    this.routerServ.navigate(["/instructores"]);
  }

  validHours(){
    let valid = true;
    for(let dia of this.diasElegidos){
      valid = valid && dia.startHour != ""&& dia.endHour != "";
    }
    console.log(valid);
    return valid;
  }



  limit(day){
    return (this.elegidos >= 2 && !day.checked);
  }

}

