import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RutinasInstructorPage } from './rutinas-instructor';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    RutinasInstructorPage,
  ],
  imports: [
    IonicPageModule.forChild(RutinasInstructorPage),
    TranslateModule
  ],
})
export class RutinasInstructorPageModule {}
