import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import { AlumnosService } from "../services/alumnos/alumnos.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers: [AlumnosService]
})
export class CalendarioComponent implements OnInit {

  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  idx = 0;
  formatedEvs= [];



  constructor(private userServ: AlumnosService) { }

  ngOnInit() {
    scheduler.config.first_hour = 8;
    scheduler.config.last_hour = 21;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.config.readonly = true;
    scheduler.config.hour_size_px = 100;
    scheduler.config.displayed_event_color = "red";
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
    this.userServ.getCalendar().subscribe(res => this.handleEvents(res),error=> console.log(error));
    

    //scheduler.parse([{id: 1 , start_date: "2018-06-07 08:00" , end_date: "2018-06-07 09:00", text: "Clase"},{id: 2 , start_date: "2018-06-07 08:00" , end_date: "2018-06-07 09:00", text: "Clase2"}], "json");
  }

  handleEvents(calendar){
    console.log(calendar);
    for(let day of calendar.classes){

      if(day.student_classes.length >0){
        console.log(day);

        this.addEvent(day.day,day.student_classes);
      }
    }
    console.log(this.formatedEvs);

    scheduler.parse(this.formatedEvs,"json");
    scheduler.updateView();
  }

  addEvent(date,events){
    for(let ev of events){
      this.formatedEvs.push({id:this.idx,start_date: date + " " + ev.startHour,end_date:date + " " + ev.endHour,text:ev.studentName})
      this.idx ++;
    }
  }

}
