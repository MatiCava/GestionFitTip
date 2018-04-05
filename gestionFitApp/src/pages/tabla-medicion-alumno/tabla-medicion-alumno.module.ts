import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TablaMedicionAlumnoPage } from './tabla-medicion-alumno';

@NgModule({
  declarations: [
    TablaMedicionAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(TablaMedicionAlumnoPage),
  ],
})
export class TablaMedicionAlumnoPageModule {}
