import { Component, OnInit,Input ,OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
	name: 'tablaMedicion',
	segment: 'alumno/:id/tabla'
}
	)

@Component({
  selector: 'page-tabla-medicion-alumno',
  templateUrl: 'tabla-medicion-alumno.html',
  providers:[UserProvider]
})
export class TablaMedicionAlumnoPage implements OnInit{
  _table:any;
  @Input() set table(tab){
    if(tab!= null){
      this._table = tab;
      if(this.dates.length == 0){
        this.names = this._table.measures.map(m => m.name);
        this.selected = this.names[0];
        this.setDates();
        this.defineChartData(0);
        this.createLineChart();
        if(this._table.measures[0].measures.length >= 1){this.tieneMed=true}
      }
      
    }
  }
  get table(){
    return this._table;
  }

  @ViewChild("grafico") lineChart;

  public tieneMed: boolean = false;
  public lineChartEl : any;
  public chartLabels : any    = [];
  public chartValues : any    = [];
  public chartColours: any    = [];
  public chartHoverColours: any    = [];
  public chartLoadingEl: any;
  public chartMeasure:any = "";
  public names:any = [];
  public selected:any;
	dates: any = [];
	id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider, private translate: TranslateService) {
    
  }

  ngOnInit(){
    if(this.id != null){
      this.getTabla();
    }
  }

  getTabla(){
  	this.userServ.getTabla(this.id).subscribe(
  		table => {this._table = table;console.log(table);
        this.setDates()},
  		error => {console.log(error)}
  		)
  }

  atras(){
    this.navCtrl.push("alumnos");
  }

  setDates(){
  	if(this._table.measures.length >0){
  		for(let i = 0 ; i < this._table.measures[0].measures.length;i++){
  			this.dates.push(new Date(this.formatDate(this._table.measures[0].measures[i].day)));

  		}
  	}
  }

  formatDate(date){
  	let newDate = date.split("-",3);
  	let day = newDate[0] ;
  	let month = newDate[1] ;
  	let year = newDate[2] ;
  	return (year + "-" + month + "-" + day);
  }

  nuevaMedicion(){
  	this.navCtrl.push("nuevaMedicion",{
  		id:this.id,
  		medidas:this._table
  	})
  }

  updateGraphic(){
    this.defineChartData(this.names.indexOf(this.selected));
    this.createLineChart();
  }

  defineChartData(index)
   {
     this.chartLabels = [];
     this.chartColours = [];
     this.chartValues = [];
     this.chartHoverColours = [];
     this.translate.get(this._table.measures[index].name).subscribe((res: string) => {
      this.chartMeasure = res;
      
  });
     for(let i = this._table.measures[index].measures.length -1 ; i >= 0;i--){
      
         var tech  = this._table.measures[index].measures[i];
         console.log(tech);

         this.chartLabels.push(tech.day);
         this.chartValues.push(tech.measure);
         this.chartColours.push('#3949AB');
         this.chartHoverColours.push('#9FA8DA');
      }
   }


  createLineChart()
   {
     console.log(this.chartLabels);
     console.log(this.chartValues);
      this.lineChartEl 			= new Chart(this.lineChart.nativeElement,
      {
         type: 'line',
         data: {
            labels: this.chartLabels,
             datasets: [{
                 label                 : this.chartMeasure,
                 data                  : this.chartValues,
                 duration              : 2000,
                 easing                : 'easeInQuart',
                 backgroundColor       : this.chartColours,
                 hoverBackgroundColor  : this.chartHoverColours,
 				         fill 				   : false
             }]
         },
         options : {
            maintainAspectRatio: false,
            legend         : {
               display     : true,
               boxWidth    : 80,
               fontSize    : 15,
               padding     : 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                       beginAtZero:false,
                       min: 30,
                       stepSize: 20,
                       max : 150
                    }
                }],
                xAxes: [{
                    ticks: {
                       autoSkip: false
                    }
                }]
            }
         }
      });
   }

}
