import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { error } from 'protractor';
import { HttpResponse } from 'selenium-webdriver/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  @ViewChild("rfidInput")
  rfidInput:ElementRef;
  @ViewChild("rfidInputRegister")
  rfidInputRegister:ElementRef;

  title = 'GestionFit';
  rfidForm: FormGroup = this.formBuilder.group({
    rfid : new FormControl('',Validators.required)
  })

  registerForm: FormGroup = this.formBuilder.group({
    rfid : new FormControl('',Validators.required),
    lessons: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.compose([
      Validators.minLength(18),
      Validators.required
    ]))
  })
  user:any;
  focused=false;
  registerBool=false;
  errorAssist = false;
  errorAssistMessage = '';
  errorRegister = false;
  errorRegisterMessage = '';
  successAlert = false;
  successAlertMessage = '';
  userRegister:any;
  usuarioEncontrado=false;

  form: FormGroup = this.formBuilder.group({
    clases : new FormControl(0,Validators.compose([
      Validators.required,Validators.min(1)
    ]))
  });

  dias=[{day:"MONDAY",startHour:"",endHour:"",checked:false},
  {day:"TUESDAY",startHour:"",endHour:"",checked:false},
  {day:"WEDNESDAY",startHour:"",endHour:"",checked:false},
  {day:"THURSDAY",startHour:"",endHour:"",checked:false},
  {day:"FRIDAY",startHour:"",endHour:"",checked:false},
  {day:"SATURDAY",startHour:"",endHour:"",checked:false}];
  diasElegidos = [];
  horas = [];
  puedeGuardar = true;
  elegidos = 0;


  constructor(private formBuilder: FormBuilder,private translate: TranslateService,
     private userServ: UserService, private spinner: NgxSpinnerService){
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.user = {nameAndSurname:"",photo:"http://www.stallerdental.com/wp-content/uploads/2016/12/user-icon.png",rfid:"",remainingLessons:0};
  }

  ngOnInit(){
    for(let i = 8;i<22;i++){
      if(i<10){
        this.horas.push('0'+i+':00');
      }
      else{
        this.horas.push(i+':00');
      }
    }
    this.rfidInput.nativeElement.focus();
  }

  onSubmit(){
    this.spinner.show();
      this.userServ.marcarAsistencia(this.rfidForm.controls.rfid.value).subscribe(
        res => {console.log(res);this.user = res;this.rfidForm.controls.rfid.setValue("");this.rfidInput.nativeElement.focus();
        this.errorAssist=false;this.spinner.hide()},
        error => {this.handleErrorAsistencia(error)}
      );
      this.clearForm();
  }

  handleErrorAsistencia(response: any){
      this.spinner.hide();
      this.errorAssist = true;
      this.errorAssistMessage = response.error.message;
      this.rfidForm.controls.rfid.setValue("");
      this.rfidInput.nativeElement.focus();
  }

  onFocus(){
    this.focused = true;
  }

  onBlur(){
    this.focused = false;
  }

  buscarUsuario(){
    this.userServ.getUser(this.registerForm.controls.mail.value).subscribe(
      res=>{this.setHorariosElegidos(res);this.userRegister = res;this.usuarioEncontrado = true;},
      error=>console.log(error));
  }

  setHorariosElegidos(user){
    console.log(user.remainingLessons === 0 || new Date().getTime() > new Date(user.lessonsExpires).getTime());
    this.form.controls.clases.setValue(user.remainingLessons);
    this.puedeGuardar = user.remainingLessons === 0 || new Date().getTime() > new Date(user.lessonsExpires).getTime(); 
    this.diasElegidos = user.classDays;
    for(let day of this.diasElegidos){
      for(let dia of this.dias){
        if(dia.day === day.day){
          dia.checked = true;
          this.elegidos ++;
        }
      }
    }

  }

  validHours(){
    let valid = true;
    for(let dia of this.diasElegidos){
      valid = valid && dia.startHour != ""&& dia.endHour != "";
    }
    console.log(valid);
    return valid;
  }


  horaSeleccionada(hora,day){
    day.endHour = this.horas[this.horas.indexOf(hora)+1] ;
    console.log(this.diasElegidos);
  }

  guardarClases(){
    this.spinner.show();
    this.userServ.addLessons(this.registerForm.controls.mail.value,this.form.controls.clases.value,this.diasElegidos).subscribe(
      res => {console.log("GUARDADO");this.handleSuccessAlert("Clases agregadas");this.usuarioEncontrado=false; this.spinner.hide();},
      error => {console.log(error);this.handleErrorRegister(error);this.spinner.hide();}
    )
  }



  check(day){
    console.log(this.dias);
    console.log(day.checked);
    if(!day.checked){
      this.elegidos -= 1;
      this.diasElegidos.splice(this.diasElegidos.indexOf(day),1);

    }else{
      this.elegidos += 1;
      this.diasElegidos.push(day);

    }
    if(this.elegidos == 0){
      this.form.controls.clases.setValue(0);
    }
    if(this.elegidos == 1){
      this.form.controls.clases.setValue(4);
    }
    if(this.elegidos == 2){
      this.form.controls.clases.setValue(8);
    }
  }

  limit(day){
    return (this.elegidos >= 2 && !day.checked);
  }

  clearForm(){
    this.registerForm.reset();
    this.rfidInputRegister.nativeElement.focus();
    this.registerBool = false;
  }


  //this.registerForm.controls.mail.setValue(""); this.registerForm.controls.rfid.setValue(""); this.rfidInputRegister.nativeElement.focus();
  saveRfid(){
    this.spinner.show();
    this.userServ.registrarRfid(this.registerForm.controls.mail.value, this.registerForm.controls.rfid.value).subscribe(
      res => {console.log(res); this.handleSuccessAlert("Rfid agregado con exito");this.spinner.hide();},
      error=> {this.handleErrorRegister(error);this.spinner.hide();}
    );
  }

  handleErrorRegister(response: any){
    this.errorRegister = true;
    this.errorRegisterMessage = response.error.message;
    this.registerForm.controls.rfid.setValue("");
    this.registerForm.controls.mail.setValue("");
    this.registerForm.controls.lessons.setValue(null);
    this.rfidInputRegister.nativeElement.focus();
  }

  handleSuccessAlert(message: string){
    this.successAlertMessage = message;
    this.successAlert = true;
  }
  
}
