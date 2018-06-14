import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import { AlumnosService } from "../services/alumnos/alumnos.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

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



  constructor(private userServ: AlumnosService,private translate : TranslateService) {
    this.translate.onLangChange.subscribe(res => {this.langChanged();console.log("CHANGED")});
   }

   applyLang(){
    console.log(this.translate.currentLang);
    if(this.translate.currentLang === "es"){
      scheduler.locale = {
        date:{
            month_full:["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            month_short:["Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            day_full:["Domingo", "Lunes", "Martes", "Miercoles", 
                "Jueves", "Viernes", "Sabado"],
            day_short:["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
        },
        labels:{
            dhx_cal_today_button:"Hoy",
            day_tab:"Dia",
            week_tab:"Semana",
            month_tab:"Mes",
            new_event:"Nuevo evento",
            icon_save:"Guardar",
            icon_cancel:"Cancelar",
            icon_details:"Detalles",
            icon_edit:"Editar",
            icon_delete:"Borrar",
            confirm_closing:"", //Your changes will be lost, are your sure?
            confirm_deleting:"Event will be deleted permanently, are you sure?",
            section_description:"Descripcion",
            section_time:"Periodo de tiempo",
            unit_tab:""
        }
    };
  } else  {
      scheduler.locale={
        date:{
            month_full:["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"],
            month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day_full:["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"],
            day_short:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        labels:{
            dhx_cal_today_button:"Today",
            day_tab:"Day",
            week_tab:"Week",
            month_tab:"Month",
            new_event:"New event",
            icon_save:"Save",
            icon_cancel:"Cancel",
            icon_details:"Details",
            icon_edit:"Edit",
            icon_delete:"Delete",
            confirm_closing:"", //Your changes will be lost, are your sure?
            confirm_deleting:"Event will be deleted permanently, are you sure?",
            section_description:"Description",
            section_time:"Time period",
            unit_tab:""
        }
      };
    };
   }

  langChanged(){
    this.applyLang();
    scheduler.updateView();
    
    }

   

  ngOnInit() {
    scheduler.config.first_hour = 8;
    scheduler.config.last_hour = 21;
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.config.readonly = true;
    scheduler.config.hour_size_px = 100;
    scheduler.config.displayed_event_color = "red";
    this.applyLang();
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
    this.userServ.getCalendar().subscribe(res => this.handleEvents(res),error=> console.log(error));
  }

  handleEvents(calendar){
    console.log(calendar);
    for(let day of calendar.classes){

      this.formatedEvs.push({id:this.idx,start_date: day.day + " " + day.startHour,
      end_date: day.day + " " + day.endHour,text:day.studentName})


    }
    console.log(this.formatedEvs);

    scheduler.parse(this.formatedEvs,"json");
    scheduler.updateView();
  }



}
