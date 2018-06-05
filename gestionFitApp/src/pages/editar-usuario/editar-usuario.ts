import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { LoginProvider } from '../../providers/login/login';
import { error } from 'util';

/**
 * Generated class for the EditarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"editarUsuario"})
@Component({
  selector: 'page-editar-usuario',
  templateUrl: 'editar-usuario.html',
  providers: [LoginProvider, UserProvider]
})
export class EditarUsuarioPage {
  usuarioExistente:any;
  emailExistente:any;

  form:FormGroup = this.formBuilder.group({
    id: new FormControl(),
    rfid: new FormControl(),
    photo: new FormControl(),
    age: new FormControl(),
    paymentDate: new FormControl(),
    lessonsExpires: new FormControl(),
    remainingLessons: new FormControl(),
    username: new FormControl('',Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
  password: new FormControl('',Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
  nameAndSurname: new FormControl('',Validators.compose([
      Validators.minLength(6),
      Validators.required
    ])),
  mail: new FormControl('',Validators.compose([
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      Validators.required
    ])),
  weigth: new FormControl('',Validators.compose([
      Validators.min(30),
      Validators.max(150),
      Validators.required
    ])),
  birthday: new FormControl('',Validators.compose([
      Validators.nullValidator,
      Validators.required
    ])),
  objective: new FormControl('',Validators.required),
  telephone: new FormControl('',Validators.compose([
      Validators.minLength(8),
      Validators.required    ])),
  observations:new FormControl('',Validators.compose([
      Validators.minLength(0)
    ])),
  pathologies: new FormControl('',Validators.compose([
      Validators.minLength(0)
    ])),
    role: new FormControl(),
    routines: new FormControl(),
    measurements: new FormControl()
  })

  loading:Loading;


  alumno = {photo:"",username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", weigth:{}, routines:[],measures:{}};
  

  constructor(private formBuilder: FormBuilder
    ,private alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, private userServ: UserProvider,private serviceLogin: LoginProvider, public loadingCtrl: LoadingController) {
    this.usuarioExistente = false;
    this.emailExistente = false;
  }

  ionViewDidLoad() {
    this.userServ.getUser(localStorage.getItem('id')).subscribe(
      res => {console.log(res);this.form.setValue(res)},
      error => console.log(error)
    );
  }

  checkUsername(usuario){
    this.userServ.checkUsername(usuario).subscribe(res => {this.usuarioExistente = res;console.log( usuario + " " +res)},error => console.log(error))
  }

  checkEmail(email){
    this.userServ.checkEmail(email).subscribe(res => {this.emailExistente = res;console.log( email + " " +res)},error => console.log(error))
  }

  validForm(){
    let invalid = false;
    for(let control in this.form.controls){
      invalid = invalid || this.form.controls[control].invalid;
    }
    return (invalid || !(this.form.dirty) || this.usuarioExistente || this.emailExistente);
  }

  volverAtras(){
    this.navCtrl.push("dashboard",{id:this.form.value.id});
  }

 

  guardarAlumno(){
    //this.crearAlumno();
    this.presentSpinner();
    this.userServ.updateStudent(this.form.value,this.form.value.id).subscribe(
    () => { 
              let confirmacion = this.alertCtrl.create({
                    title: 'Confirmacion',
                    message: 'Informacion actualizada',
                    buttons: [{
                      text: 'Ok',
                      handler: () => {
                        this.navCtrl.push("dashboard",{id:this.form.value.id});
                      }
                    }] 
              }

              ); 
              this.loading.dismiss();
              confirmacion.present();
              er => {
                console.log(er);
              }
          });
  }

  presentSpinner(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Wait please',
    });
  
    this.loading.present();
  }

}
