import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnosPage } from './alumnos';
import { UserProvider } from '../../providers/user/user'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AlumnosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnosPage),
    HttpClientModule,
  ],
  providers: [
  	UserProvider
  ]
})
export class AlumnosPageModule {}
