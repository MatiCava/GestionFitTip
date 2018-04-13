import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnosPage } from './alumnos';
import { UserProvider } from '../../providers/user/user'
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    AlumnosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnosPage),
    HttpClientModule,
    TranslateModule
  ],
  providers: [
  	UserProvider
  ]
})
export class AlumnosPageModule {}
