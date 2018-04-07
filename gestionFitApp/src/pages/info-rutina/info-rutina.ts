import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine'
import { Routine } from '../../model/routine'

/**
 * Generated class for the InfoRutinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
	rutina: Routine;

  constructor(public navCtrl: NavController, public navParams: NavParams, private routineService: RoutineProvider) {
  	this.navParams.get("id");
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

}
