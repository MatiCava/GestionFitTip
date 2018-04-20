import { Component, OnInit,Input ,OnChanges, SimpleChanges} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

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
export class TablaMedicionAlumnoPage implements OnInit, OnChanges{
  _table:any;
  @Input() set table(tab){
    if(tab!= null){
      console.log(tab);
      this._table = tab;
      if(this.dates.length == 0){
        console.log("AHORA SI");
        this.setDates();
      }
      
    }
  }
  get table(){
    return this._table;
  }

	dates: any = [];
	id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider) {
    
    if(this.navParams.get("isInstructor") != null){
      this.id = this.navParams.get("id");   
      console.log("ALLAHU AKBAR "+this.id);
    }
  }

  ngOnInit(){
    if(this.id != null){
      this.getTabla();
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['table']){
      console.log(this.table);
    }
  }

  ionViewDidLoad() {
  }

  isInstructor(){
  	return ( localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Instructor" );
  }

  getTabla(){
  	this.userServ.getTabla(this.id).subscribe(
  		table => {this._table = table;console.log(table);
        this.setDates()},
  		error => {console.log(error)}
  		)
  }

  setDates(){
  	if(this._table.measures.length >0){
  		for(let i = 0 ; i < this._table.measures[0].measures.length;i++){
  			this.dates.push(new Date(this.formatDate(this._table.measures[0].measures[i].day)).toUTCString().slice(4,16));

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

}
