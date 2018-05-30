import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Slides, LoadingController } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import { InfoRutinaPage } from '../info-rutina/info-rutina';
import { LoginProvider } from '../../providers/login/login';


@IonicPage(
{
	name:"dashboard",
	segment:"alumno/:id/home"
})
@Component({
  selector: 'page-dashboard-alumno',
  templateUrl: 'dashboard-alumno.html',
  providers:[UserProvider,LoginProvider]
})
export class DashboardAlumnoPage implements OnInit{

  @ViewChild(Slides) slides : Slides;
  dates: any = [];
	id:any;
  public user;



  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, private userServ : UserProvider, private loginServ: LoginProvider, public loadingCtrl: LoadingController) {
    this.id = this.navParams.get("id");
    //this.id = localStorage.getItem("id");
    console.log(this.id);
    this.user = {photo:"",username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", age:{}, weigth:{},routines:[]};
  }

  ngOnInit(){
    this.presentSpinner();
    this.loginServ.auth().subscribe(res => {this.getUser();},error=> {this.navCtrl.push('login')})
  }

  ionViewDidEnter(){
    
  }

  presentSpinner(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Wait please',
      dismissOnPageChange: true,
      duration: 8000
    });
  
    loading.present();
  }



  inSlide(slideInd){
    return this.slides.getActiveIndex() == slideInd;
  }

  ionViewDidLoad() {
    
    
  }


  
  getUser(){
  	this.userServ.getUser(this.id).subscribe(
      alumno => {this.user = alumno;},
  		error => {console.log(error)})
  }

  goToSlide(slide){
    this.slides.slideTo(slide,500);
  }



}
