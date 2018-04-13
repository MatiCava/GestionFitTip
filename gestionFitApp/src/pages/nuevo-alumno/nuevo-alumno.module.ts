import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoAlumnoPage } from './nuevo-alumno';
import { UserProvider } from '../../providers/user/user'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    NuevoAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoAlumnoPage),
    TranslateModule
  ],
  providers: [
  	UserProvider
  ]
})
export class NuevoAlumnoPageModule {}
