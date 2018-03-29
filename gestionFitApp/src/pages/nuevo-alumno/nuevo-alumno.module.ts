import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoAlumnoPage } from './nuevo-alumno';

@NgModule({
  declarations: [
    NuevoAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoAlumnoPage),
  ],
})
export class NuevoAlumnoPageModule {}
