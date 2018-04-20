import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';



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

  form:FormGroup= this.formBuilder.group({
  });
	medidas = [];
	mediciones = [];
	id : any;
	tabla:any;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
		this.tabla = this.navParams.get("medidas");
		for(let i;i<this.tabla.measures.length;i++){
			this.form.addControl(i,new FormControl(Validators.compose([Validators.min(18),
				Validators.max(250),
				Validators.nullValidator])));
		}
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
