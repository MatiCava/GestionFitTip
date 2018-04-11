import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine'
import { Routine } from '../../model/routine'

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
	rutina = {creationDate:{},type:0,exercises:[]};

  constructor(public navCtrl: NavController,private viewCtrl: ViewController, public navParams: NavParams, private routineService: RoutineProvider) {
  	this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoRutinaPage');
    this.getInfoRutina();
  }

  getInfoRutina(){
  	this.routineService.getRoutine(this.id).subscribe(
  			routine => {this.rutina = routine;console.log(this.rutina)},
  			error => {console.log(error)}
  			)
  }

  cancel(){
    this.viewCtrl.dismiss();
  }



}
