import { Component,OnInit, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { User_Student } from '../../model/user_student'
import { InfoRutinaPage } from '../info-rutina/info-rutina';
import { Chart } from 'chart.js';

@IonicPage({
	name: 'infoAlumno'
})
@Component({
  selector: 'info-alumno',
  templateUrl: 'info-alumno.html',
  providers:[UserProvider]
})
export class InfoAlumnoPage implements OnInit{

  @ViewChild('pieCanvas') pieCanvas;

  classes: any = [];
  tieneClasses = false;
  id: any;
  user:any;
  asistencia:any;
  inasistencia:any;
  pieChart: any;
  
  @Input() set nUser(nUser){
    this.user = nUser;
    this.asistencia = (this.user.assistance);
    console.log(nUser);
    this.inasistencia = 100 - this.user.assistance;
    this.getPieChart();
    this.tieneClasses = this.user.classDays != null && this.user.classDays.length > 0;

  }

  get nUser(){
    return this.user;
  }
  

  constructor(public navCtrl: NavController,private viewCtrl: ViewController, public navParams: NavParams, private userServ: UserProvider) {
  	this.id = this.navParams.get("id");
    this.user={};
  }

  ngOnInit(){
    
  }

  ionViewDidLoad() {
  }

  formatearTelefono(tel){
    if(tel.length == 8){
      return tel.slice(0,4)+"-"+tel.slice(4,8);
    }
    else{
      return tel.slice(0,2)+" "+tel.slice(2,6)+"-"+tel.slice(6,10);
    }
  }

  
  sinRutinas(){
    return this.user.routines.length == 0;
  }

  abrirInfo(idRoutine){
   this.navCtrl.push(InfoRutinaPage,{id:idRoutine}); 
   
  }

  editarUsuario(){
    
    this.navCtrl.push("editarUsuario");
  }

  getPieChart(){
    let data = {
      type: 'pie',
      data: {
        datasets: [{
            data: [this.asistencia,this.inasistencia],
            backgroundColor: [
              '#5cf442',
              '#db0d0d'
            ]
        }],
    
        labels: [
            'Asistencia',
            'Inasistencia'
        ]
   }};
    
 
    this.pieChart = new Chart(this.pieCanvas.nativeElement, data);
  }

}
