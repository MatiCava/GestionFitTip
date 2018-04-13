import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage({
	name:"nuevaMedicion",
	segment:"alumno/:id/nuevaMedicion"
})
@Component({
  selector: 'page-nueva-medicion',
  templateUrl: 'nueva-medicion.html',
  providers: [UserProvider]
})
export class NuevaMedicionPage {

	medidas = [];
	mediciones = [];
	id : any;
	tabla:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
  	this.tabla = this.navParams.get("medidas");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaMedicionPage');
    this.setMedidas();
  }

  setMedidas(){
  	for(let i =0;i<this.tabla.measures.length;i++){
  		this.medidas.push({name:this.tabla.measures[i].name});
  		this.mediciones.push({day:null,measure:0,height:0})
  	}
  }

  guardar(){
  	this.userServ.updateTable(this.id,{day:new Date().getTime(),measures:this.mediciones}).subscribe(
  		res => {console.log(res);this.navCtrl.push('tablaMedicion',{id:this.id});},
  		error => {console.log(error);}
  		)
  }

}
