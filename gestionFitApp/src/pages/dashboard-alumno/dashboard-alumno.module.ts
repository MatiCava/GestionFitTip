import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAlumnoPage } from './dashboard-alumno';
import { TranslateModule } from '@ngx-translate/core';
import { TablaMedicionAlumnoPage } from '../tabla-medicion-alumno/tabla-medicion-alumno';
import { InstagramFeedPage } from '../instagram-feed/instagram-feed';
import { TablaMedicionAlumnoPageModule } from '../tabla-medicion-alumno/tabla-medicion-alumno.module';
import { InfoAlumnoPage } from '../info-alumno/info-alumno';
import { InfoAlumnoPageModule } from '../info-alumno/info-alumno.module';

@NgModule({
  declarations: [
    DashboardAlumnoPage,
    InstagramFeedPage
  ],
  imports: [
    IonicPageModule.forChild(DashboardAlumnoPage),
    TranslateModule,
    TablaMedicionAlumnoPageModule,
    InfoAlumnoPageModule
  ],
  entryComponents: [TablaMedicionAlumnoPage, InstagramFeedPage]
})
export class DashboardAlumnoPageModule {}
