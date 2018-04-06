import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevaMedicionPage } from './nueva-medicion';

@NgModule({
  declarations: [
    NuevaMedicionPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevaMedicionPage),
  ],
})
export class NuevaMedicionPageModule {}
