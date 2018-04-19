import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAlumnoPage } from './dashboard-alumno';
import { TranslateModule } from '@ngx-translate/core';
import { TablaMedicionAlumnoPage } from '../tabla-medicion-alumno/tabla-medicion-alumno';

@NgModule({
  declarations: [
    DashboardAlumnoPage,
    TablaMedicionAlumnoPage
  ],
  imports: [
    IonicPageModule.forChild(DashboardAlumnoPage),
    TranslateModule
  ],
  entryComponents: [TablaMedicionAlumnoPage]
})
export class DashboardAlumnoPageModule {}
