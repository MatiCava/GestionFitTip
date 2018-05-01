import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RoutineService } from './../services/routine/routine.service';


@Component({
  selector: 'app-eliminar-rutina-dialog',
  templateUrl: './eliminar-rutina-dialog.component.html',
  styleUrls: ['./eliminar-rutina-dialog.component.css']
})
export class EliminarRutinaDialogComponent implements OnInit {

  id:any;
  rutina:any;

  constructor(private routineServ: RoutineService, public thisDialogRef: MatDialogRef<EliminarRutinaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
  }

  ngOnInit() {
    this.getRutina();
  }

  delete() {
    this.routineServ.deleteRoutine(this.id).subscribe(
      result => {console.log(result);},
      error => {console.log(error);}
    );
    this.thisDialogRef.close();
  }
  close() {
    this.thisDialogRef.close();
  }

  getRutina(){
    this.routineServ.getRoutine(this.id).subscribe(
      result => {this.rutina = result;},
      error => {console.log(error);}
      );
  }

}
