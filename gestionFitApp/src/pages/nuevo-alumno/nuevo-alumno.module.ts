import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoAlumnoPage } from './nuevo-alumno';
import { UserProvider } from '../../providers/user/user'

@NgModule({
  declarations: [
    NuevoAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoAlumnoPage),
  ],
  providers: [
  	UserProvider
  ]
})
export class NuevoAlumnoPageModule {}
