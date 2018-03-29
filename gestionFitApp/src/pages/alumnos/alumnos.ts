import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'alumnos'
})
@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
})
export class AlumnosPage {

	alumnos:any = [{"name":"Alfredo"},{"name":"Carlo"},{"name":"Roberto"}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnosPage');
  }

}
