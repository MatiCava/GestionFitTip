import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Slides, LoadingController, Loading, Refresher } from 'ionic-angular';
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
  loading: Loading;
  loadingIcon = "fas fa-sync";



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

  doRefresh() {
    this.loadingIcon = "fas fa-sync fa-spin"
    this.userServ.getUser(this.id).subscribe(
      alumno => {this.user = alumno;this.loadingIcon="fas fa-sync"},
  		error => {console.log(error);})
  }

  ionViewDidEnter(){
    
  }

  presentSpinner(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Wait please',
    });
  
    this.loading.present();

  }



  inSlide(slideInd){
    return this.slides.getActiveIndex() == slideInd;
  }

  ionViewDidLoad() {
    
    
  }


  
  getUser(){
  	this.userServ.getUser(this.id).subscribe(
      alumno => {this.user = alumno;this.loading.dismiss()},
  		error => {console.log(error)})
  }

  goToSlide(slide){
    this.slides.slideTo(slide,500);
  }



}
