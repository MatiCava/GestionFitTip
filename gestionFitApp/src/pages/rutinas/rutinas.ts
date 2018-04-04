import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoutineProvider } from '../../providers/routine/routine'
import { Routine } from '../../model/routine'

/**
 * Generated class for the RutinasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rutinas',
  templateUrl: 'rutinas.html',
  providers: [RoutineProvider]
})
export class RutinasPage {

  rutinasProvider: RoutineProvider;
  rutinas: Routine[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public routineProvider: RoutineProvider) {
  	this.rutinasProvider = routineProvider;
  	this.traerRutinas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutinasPage');
  }

  traerRutinas(){
  	this.rutinasProvider.getRutines().subscribe(
  						result => this.rutinas = result,
  						err => console.log(err),
  						() => console.log(this.rutinas)
  						)
  }

}
