import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, LoadingController, Loading } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine'

@IonicPage({
	name: 'infoRutina'
})
@Component({
  selector: 'page-info-rutina',
  templateUrl: 'info-rutina.html',
  providers:[RoutineProvider]
})
export class InfoRutinaPage {

	id:any;
  public rutina;
  private ejercicios;
  private iniciada=false;
  private finish=false;
  loading:Loading;

  constructor(public navCtrl: NavController,private viewCtrl: ViewController, public navParams: NavParams, private routineService: RoutineProvider, public loadingCtrl: LoadingController) {
  	this.id = this.navParams.get("id");
    this.rutina={};
  }
  
  presentSpinner(){
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Wait please',
    });
  
    this.loading.present();
  }

  ionViewDidLoad() {
    this.presentSpinner();
    this.getInfoRutina();
  }

  comenzar(){
    this.iniciada=true;
  }
  

  cancel(){
    let ex:any;
    for(ex in this.rutina.exercises){
     ex.checked =false;
    }
    this.iniciada=false;
  }

  terminada(){

    return this.finish;
  }

  enCurso(){
    return this.iniciada;
  }

  getInfoRutina(){
  	this.routineService.getRoutine(this.id).subscribe(
        routine => {this.rutina = routine;
                    this.loading.dismiss()},
  			error => {console.log(error)}
  			)
  }


  checkFinalizo(){
    let checked = this.rutina.exercises.filter(ex => ex.checked == true)
    this.finish =checked.length == this.rutina.exercises.length;

  }

  atras(){
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }
    else{
      this.navCtrl.push("dashboard",{id:this.id});
    }
  }



}
