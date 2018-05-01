import { Component, OnInit } from '@angular/core';
import { Routine } from './../model/routine';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { EliminarRutinaDialogComponent } from './../eliminar-rutina-dialog/eliminar-rutina-dialog.component';

@Component({
  selector: 'app-lista-rutinas',
  templateUrl: './lista-rutinas.component.html',
  styleUrls: ['./lista-rutinas.component.css']
})
export class ListaRutinasComponent implements OnInit {

  rutinas:any[];
  eliminarRutinaDialogRef: MatDialogRef<EliminarRutinaDialogComponent>;

  constructor(private routineServ: RoutineService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.traerRutinas()
  }

  traerRutinas(){
  	this.routineServ.getRutines().subscribe(
  						result => {this.rutinas = result;},
  						error => {console.log(error);},
  						)
  }

  infoRoutine(idR){
    this.router.navigate(['/rutina/info', idR]);
  }

  editRoutine(idR){
    this.router.navigate(['/rutina/edit', idR]);
  }

  openDeleteRoutineDialog(idR){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      id: idR,
      title: 'Angular For Beginners'
  };

    this.eliminarRutinaDialogRef = this.dialog.open(EliminarRutinaDialogComponent, dialogConfig);
  }

}
