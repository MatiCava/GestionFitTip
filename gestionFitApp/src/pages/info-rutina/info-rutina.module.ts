import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoRutinaPage } from './info-rutina';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    InfoRutinaPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoRutinaPage),
    TranslateModule
  ],
})
export class InfoRutinaPageModule {}
