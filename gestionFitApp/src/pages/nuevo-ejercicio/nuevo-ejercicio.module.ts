import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoEjercicioPage } from './nuevo-ejercicio';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    NuevoEjercicioPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoEjercicioPage),
    TranslateModule
  ],
})
export class NuevoEjercicioPageModule {}
