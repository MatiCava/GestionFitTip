import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'infoAlumno'
})
@Component({
  selector: 'page-info-alumno',
  templateUrl: 'info-alumno.html',
})
export class InfoAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAlumnoPage');
  }

}
