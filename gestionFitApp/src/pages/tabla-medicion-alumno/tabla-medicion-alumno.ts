import { Component, OnInit } from '@angular/core';
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
export class TablaMedicionAlumnoPage implements OnInit{

	tabla : any = {measures:[]};
	dates: any = [];
	id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
  }

  ngOnInit(){
    this.getTabla();

  }

  ionViewDidLoad() {
  }

  isInstructor(){
  	return ( localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Instructor" );
  }

  getTabla(){
  	this.userServ.getTabla(this.id).subscribe(
  		table => {this.tabla = table;console.log(table),this.setDates()},
  		error => {console.log(error)}
  		)
  }

  setDates(){
  	if(this.tabla.measures.length >0){
  		for(let i = 0 ; i < this.tabla.measures[0].measures.length;i++){
  			this.dates.push(new Date(this.formatDate(this.tabla.measures[0].measures[i].day)).toUTCString().slice(4,16));

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
  		medidas:this.tabla
  	})
  }

}
