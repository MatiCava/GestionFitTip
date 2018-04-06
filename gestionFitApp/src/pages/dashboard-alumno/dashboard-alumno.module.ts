import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAlumnoPage } from './dashboard-alumno';

@NgModule({
  declarations: [
    DashboardAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardAlumnoPage),
  ],
})
export class DashboardAlumnoPageModule {}
