import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Slides } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import { InfoRutinaPage } from '../info-rutina/info-rutina';


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
  public user;



  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, private userServ : UserProvider) {
  	this.id = this.navParams.get("id");
    this.user = {photo:"",username:"", password:"", nameAndSurname:"", mail:"",role:0, pathologies:"", observations:"", objective:"", birthday:{}, telephone:"", age:{}, weigth:{},routines:[]};
  }

  ngOnInit(){
    this.getUser();
  }



  inSlide(slideInd){
    return this.slides.getActiveIndex() == slideInd;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardAlumnoPage');
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
