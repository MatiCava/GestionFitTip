import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { MedidasService } from '../services/medidas/medidas.service';



@Component({
  selector: 'app-nueva-medicion',
  templateUrl: './nueva-medicion.component.html',
  styleUrls: ['./nueva-medicion.component.css'],
  providers: [AlumnosService]
})
export class NuevaMedicionComponent implements OnInit {
  formMeasures:FormGroup= this.formBuilder.group({
	});
	formHeight:FormGroup= this.formBuilder.group({
  });
	medidas = [];
	mediciones = [];
	id : any;
	nombresMedidas:any = [];

  constructor(private formBuilder: FormBuilder, private userServ: AlumnosService, private route: ActivatedRoute, private router: Router, private medidasServ: MedidasService) {
    this.getId();
		this.getCantMedidas();
		for(let i=0;i<this.nombresMedidas.length;i++){
			this.formMeasures.addControl(i+"",new FormControl("",Validators.compose([Validators.min(18),
				Validators.max(250),
				Validators.required])));
			this.formHeight.addControl(i+"",new FormControl("",Validators.compose([Validators.min(0),
				Validators.max(200),
				Validators.required])));

		}
  }
  
  getId() {
    this.route.paramMap.switchMap((params: ParamMap) =>
                                  params.get('id')).subscribe(
                                        res => {this.id = res; },
                                        error => {console.log(error); },
                                  );
  }

  getCantMedidas(){
    this.nombresMedidas = this.medidasServ.getMedidas();
    console.log(this.medidasServ.getMedidas()) ;

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

  ngOnInit() {
    this.setMedidas();
  }

  setMedidas(){
  	for(let i =0;i<this.nombresMedidas.length;i++){
  		this.medidas.push({name:this.nombresMedidas[i]});
  	}
	}
	
	setValores(){
		for(let i =0;i<this.nombresMedidas.length;i++){
			this.mediciones.push({day:null,measure:this.formMeasures.get(i+"").value,height:this.formHeight.get(i+"").value});
		
		}
		console.log(this.mediciones);
	}

  guardar(){
		this.setValores();

  	this.userServ.updateTable(this.id,{day:new Date().getTime(),measures:this.mediciones}).subscribe(
  		res => {console.log(res);this.router.navigate(["/alumno/mediciones",this.id]);},
  		error => {console.log(error);}
  		);
  }


}
