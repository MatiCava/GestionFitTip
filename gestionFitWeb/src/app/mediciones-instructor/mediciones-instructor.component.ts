import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { ParamMap, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MedidasService } from '../services/medidas/medidas.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mediciones-instructor',
  templateUrl: './mediciones-instructor.component.html',
  styleUrls: ['./mediciones-instructor.component.css'],
  providers: [AlumnosService]
})
export class MedicionesInstructorComponent implements OnInit {

  dates: any = [];
  id: any;
  _table: any;
  nombresMedidas: any = [];
  tieneMed: boolean = false;

  constructor(private translateService: TranslateService, private userServ: AlumnosService, private route: ActivatedRoute, private router: Router, private medidasServ: MedidasService) {
    this._table = {};
  }

  ngOnInit() {
    this.getId();
    this.getTabla();
   }

  getId() {
    this.route.paramMap.switchMap((params: ParamMap) =>
                                  params.get('id')).subscribe(
                                        res => {this.id = res; },
                                        error => {console.log(error); },
                                  );
  }

  tieneMediciones(){

  }

  getTabla() {
      this.userServ.getTabla(this.id).subscribe(
        table => {this._table = table; console.log(table);if(this._table.measures[0].measures.length >=1){this.tieneMed = true;};
        this.setDates(); },
        error => {console.log(error); }
      );
  }

  setDates() {
    if (this._table.measures.length > 0) {
      for (let i = 0 ; i < this._table.measures[0].measures.length; i++) {
        this.dates.push(new Date(this.formatDate(this._table.measures[0].measures[i].day))) ;

      }
    }
  }

  formatDate(date) {
    const newDate = date.split("-", 3);
    const day = newDate[0] ;
    const month = newDate[1] ;
    const year = newDate[2] ;
    return (year + "-" + month + "-" + day);
  }

  getNames(){
    for(let medida of this._table.measures){
      this.nombresMedidas.push(medida.name);
    }
  }

  nuevaMedicion(){
    this.getNames();
    this.medidasServ.saveMedidas(this.nombresMedidas);
    this.router.navigate(['alumno/medicion/nueva',this.id]);
  }
}
