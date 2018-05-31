import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { error } from 'protractor';

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
    mail: new FormControl('', Validators.compose([
      Validators.minLength(18),
      Validators.required
    ]))
  })
  user:any;
  focused=false;
  registerBool=false;

  constructor(private formBuilder: FormBuilder, private userServ: UserService){
    this.user = {nameAndSurname:"",photo:"http://www.stallerdental.com/wp-content/uploads/2016/12/user-icon.png",rfid:"",remainingLessons:0};
  }

  ngOnInit(){
    this.rfidInput.nativeElement.focus();
  }

  onSubmit(){
      this.userServ.marcarAsistencia(this.rfidForm.controls.rfid.value).subscribe(
        res=>{console.log(res);this.user = res;this.rfidForm.controls.rfid.setValue("");this.rfidInput.nativeElement.focus();},
        error => console.log(error)
      );
  }

  onFocus(){
    this.focused = true;
  }

  onBlur(){
    this.focused = false;
  }

  saveRfid(){
    this.userServ.registrarRfid(this.registerForm.controls.mail.value, this.registerForm.controls.rfid.value).subscribe(
      res => console.log(res),
      error=> console.log(error)
    );
    this.userServ.marcarAsistencia(this.registerForm.controls.rfid.value).subscribe(
      res=>{console.log(res);this.user = res;this.registerForm.controls.rfid.setValue("");this.rfidInputRegister.nativeElement.focus();},
      error => console.log(error)
    );
  }
  
}
