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

  formMeasures:FormGroup= this.formBuilder.group({
	});
	formHeight:FormGroup= this.formBuilder.group({
  });
	medidas = [];
	mediciones = [];
	id : any;
	tabla:any;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
		this.tabla = this.navParams.get("medidas");
		for(let i=0;i<this.tabla.measures.length;i++){
			this.formMeasures.addControl(i+"",new FormControl("",Validators.compose([Validators.min(18),
				Validators.max(250),
				Validators.required])));
			this.formHeight.addControl(i+"",new FormControl("",Validators.compose([Validators.min(0),
				Validators.max(200),
				Validators.required])));

		}
	}
	
	validForm(){
    let invalid = false;
    for(let control in this.formMeasures.controls){
      invalid = invalid || this.formMeasures.controls[control].invalid;
		}
		for(let control in this.formHeight.controls){
      invalid = invalid || this.formHeight.controls[control].invalid;
		}
    return (invalid || (!(this.formHeight.dirty) && !(this.formMeasures.dirty)));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevaMedicionPage');
    this.setMedidas();
  }

  setMedidas(){
  	for(let i =0;i<this.tabla.measures.length;i++){
  		this.medidas.push({name:this.tabla.measures[i].name});
  	}
	}
	
	setValores(){
		for(let i =0;i<this.tabla.measures.length;i++){
			this.mediciones.push({day:null,measure:this.formMeasures.get(i+"").value,height:this.formHeight.get(i+"").value});
		
		}
		console.log(this.mediciones);
	}

  guardar(){
		this.setValores();

  	this.userServ.updateTable(this.id,{day:new Date().getTime(),measures:this.mediciones}).subscribe(
  		res => {console.log(res);this.navCtrl.push('tablaMedicion',{id:this.id});},
  		error => {console.log(error);}
  		)
  }

}
