import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    scheduler.config.first_hour = 8;
    scheduler.config.last_hour = 21;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.config.readonly = true;
    scheduler.config.hour_size_px = 100;
    scheduler.config.displayed_event_color = "red";
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
    scheduler.parse([{id: 1 , start_date: "2018-06-07 08:00" , end_date: "2018-06-07 09:00", text: "Clase"},{id: 2 , start_date: "2018-06-07 08:00" , end_date: "2018-06-07 09:00", text: "Clase2"}], "json");
  }

}
