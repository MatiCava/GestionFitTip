import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAlumnoPage } from './info-alumno';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    InfoAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAlumnoPage),
    TranslateModule
  ],
  exports: [InfoAlumnoPage]
})
export class InfoAlumnoPageModule {}
