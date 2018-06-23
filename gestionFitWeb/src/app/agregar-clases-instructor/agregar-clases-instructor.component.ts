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

  dias=[{day:"MONDAY",startEndHours: [],checked:false},
  {day:"TUESDAY",startEndHours: [],checked:false},
  {day:"WEDNESDAY",startEndHours: [],checked:false},
  {day:"THURSDAY",startEndHours: [],checked:false},
  {day:"FRIDAY",startEndHours: [],checked:false},
  {day:"SATURDAY",startEndHours: [],checked:false}];
  diasElegidos = [];
  idUser:any;
  diasOcupados:any[] = [];

  puedeGuardar = true;
  elegidos = 0;

  constructor(private userServ: AlumnosService, private routerServ: Router,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.idUser = this.route.snapshot.paramMap.get("id");
   }

  ngOnInit() {
    this.userServ.getUser(this.idUser).subscribe(res => this.setHorariosElegidos(res) ,error => console.log(error));
    this.userServ.getInstructorDays().subscribe(
      res => {this.diasOcupados = res;console.log(res);},
      error => console.log(error)
    );
  }

  setHorariosElegidos(user){
    this.diasElegidos = (user.classes);
    for(let day of this.diasElegidos){
      for(let dia of this.dias){
        if(dia.day === day.day){
          dia.checked = true;
          this.elegidos ++;
        }
      }
    }

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
      for(let hours of dia.startEndHours){
        valid = valid && (hours.startHour != "") && (hours.endHour != "") && (hours.endHour > hours.startHour);
        valid = valid && this.validHour(hours, dia.startEndHours);
      }
    }
    return valid && this.diasElegidos.length > 0;
  }

  hourInvalid(hour,day){
    let invalid = false;
    for(let occupedDay of this.diasOcupados){
      if(occupedDay.day === day){
        for(let occupedHour of occupedDay.startEndHours){
          invalid = invalid || (hour >= occupedHour.startHour && hour <= occupedHour.endHour);
        }
      }
      
    }
    return invalid;
  }

  occupedHours(){
    let occuped = false;
    for(let dia of this.diasElegidos){
      for(let hour of dia.startEndHours){
        occuped = occuped || (this.hourInvalid(hour.startHour,dia.day) || this.hourInvalid(hour.endHour,dia.day));
      }
    }
    return occuped;
  }

  validHour(actual,hours){
    let valid = true;
    for(let hour of hours){
      if(actual != hour){
      valid = valid && !(hour.endHour > actual.startHour && actual.startHour >= hour.startHour)
       && !(hour.endHour > actual.endHour && actual.endHour >= hour.startHour)
      }
    }
    return valid;
  }

  check(dia){
    if(this.diasElegidos.includes(dia)){
      dia.startEndHours = [];
      this.diasElegidos.splice(this.diasElegidos.indexOf(dia), 1);
    } else {
      dia.startEndHours.push({startHour:0,endHour:0});
      this.diasElegidos.push(dia);
    }
  }



  limit(day){
    return (this.elegidos >= 2 && !day.checked);
  }

}

