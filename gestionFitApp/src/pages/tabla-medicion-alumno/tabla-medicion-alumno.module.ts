import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TablaMedicionAlumnoPage } from './tabla-medicion-alumno';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    TablaMedicionAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(TablaMedicionAlumnoPage),
    TranslateModule
  ],
})
export class TablaMedicionAlumnoPageModule {}
