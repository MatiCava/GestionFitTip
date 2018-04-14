import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Slides } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import { InfoRutinaPage } from '../info-rutina/info-rutina'



@IonicPage(
{
	name:"dashboard",
	segment:"alumno/:id/home"
})
@Component({
  selector: 'page-dashboard-alumno',
  templateUrl: 'dashboard-alumno.html',
  providers:[UserProvider]
})
export class DashboardAlumnoPage implements OnInit{

  @ViewChild(Slides) slides : Slides;
  dates: any = [];
	id:any;
  user :any= {username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", age:{}, weigth:{},measurements:{measures:["","","","","","",""]},routines:[]};

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, private userServ : UserProvider) {
  	this.id = this.navParams.get("id")
  }

  ngOnInit(){
    this.getUser();
  }

   setDates(){
    if(this.user.measurements.measures.length >0){
      for(let i = 0 ; i < this.user.measurements.measures[0].measures.length;i++){
        this.dates.push(new Date(this.formatDate(this.user.measurements.measures[0].measures[i].day)).toUTCString().slice(4,16));

      }
    }
  }

  inSlide(slideInd){
    return this.slides.getActiveIndex() == slideInd;
  }

  formatDate(date){
    let newDate = date.split("-",3);
    let day = newDate[0] ;
    let month = newDate[1] ;
    let year = newDate[2] ;
    return (year + "-" + month + "-" + day);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardAlumnoPage');
  }


  isInstructor(){
    return ( localStorage.getItem("user_role") != null && localStorage.getItem("user_role") == "Instructor" );
  }

  getUser(){
  	this.userServ.getUser(this.id).subscribe(
  		alumno => {this.user = alumno;    this.setDates();},
  		error => {console.log(error)})
  }

  verTabla(){
  	this.navCtrl.push('tablaMedicion',{id:this.id});
  }

  verRutinas(){
    this.navCtrl.push('rutinasAlumno',{id:this.id});
  }

   abrirInfo(idRoutine){
    console.log(idRoutine);
    let infoModal = this.modalCtrl.create(InfoRutinaPage,{id:idRoutine}); 
    infoModal.present();
  }

  goToSlide(slide){
    console.log(this.slides._slides);
    this.slides.slideTo(slide,500);
  }

  sinRutinas(){
    return this.user.routines.length == 0;
  }

}
