import { Component,ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController,Slides,Slide, LoadingController, Loading } from 'ionic-angular';
import { User_Student,User_Role } from '../../model/user_student';
import { Camera,CameraOptions } from '@ionic-native/camera'; 
import { LoginProvider } from '../../providers/login/login';
import { UserProvider } from '../../providers/user/user';

@IonicPage(
	{name:"nuevoAlumno"}
)

@Component({
  selector: 'page-nuevo-alumno',
  templateUrl: 'nuevo-alumno.html',
  providers: [LoginProvider, UserProvider]
})
export class NuevoAlumnoPage {

    @ViewChild(Slides) slides : Slides;

    usuarioExistente:any;
    emailExistente:any;

  form:FormGroup = this.formBuilder.group({
    photo : new FormControl('',Validators.required),
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
    measures: new FormControl()
  })

  loading:Loading;  

  constructor(private camera: Camera,private formBuilder: FormBuilder
    ,private alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, public serviceLogin: LoginProvider,private userServ: UserProvider, public loadingCtrl: LoadingController) {
    this.usuarioExistente = false;
    this.emailExistente = false;
    this.form.controls.routines.setValue([]);
    this.form.controls.measures.setValue({});
    this.form.controls.role.setValue("STUDENT");
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
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
    return (invalid || !(this.form.dirty) || this.usuarioExistente);
  }

  volverAtras(){
    this.navCtrl.push('login');
  }

 

  guardarAlumno(){
    this.presentSpinner();
    this.serviceLogin.signup(this.form.value).subscribe(
    () => { 
              let confirmacion = this.alertCtrl.create({
                    title: 'Confirmacion',
                    message: 'Usuario creado',
                    buttons: [{
                      text: 'Ok',
                      handler: () => {
                        this.navCtrl.push('login');
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
    this.navCtrl.push('alumnos');
  }

  presentSpinner(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Wait please',
    });
  
    this.loading.present();
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.form.controls.photo.setValue(base64Image);
     this.slides.lockSwipes(false);
     this.slides.slideNext();
     this.slides.lockSwipes(true);

    }, (err) => {
      console.log(err);
    });
  }

}
