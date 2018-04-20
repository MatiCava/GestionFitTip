import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaRutinaPage } from './nueva-rutina';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    NuevaRutinaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaRutinaPage),
    TranslateModule
  ],
})
export class NuevaRutinaPageModule {}
