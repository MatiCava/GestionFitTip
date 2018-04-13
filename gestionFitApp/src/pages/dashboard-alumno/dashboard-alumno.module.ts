import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAlumnoPage } from './dashboard-alumno';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    DashboardAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardAlumnoPage),
    TranslateModule
  ],
})
export class DashboardAlumnoPageModule {}
