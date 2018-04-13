import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaMedicionPage } from './nueva-medicion';
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
  declarations: [
    NuevaMedicionPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaMedicionPage),
    TranslateModule
  ],
})
export class NuevaMedicionPageModule {}
