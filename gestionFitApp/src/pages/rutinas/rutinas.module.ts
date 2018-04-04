import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RutinasPage } from './rutinas';
import { RoutineProvider } from '../../providers/routine/routine' 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RutinasPage,
  ],
  imports: [
    IonicPageModule.forChild(RutinasPage),
    HttpClientModule,
  ],
  providers: [
  	RoutineProvider
  ]
})
export class RutinasPageModule {}
