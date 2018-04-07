import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlumnosPage } from '../pages/alumnos/alumnos';
import { AlumnosPageModule } from '../pages/alumnos/alumnos.module';
import { InfoAlumnoPage } from '../pages/info-alumno/info-alumno'
import { InfoAlumnoPageModule } from '../pages/info-alumno/info-alumno.module'


import { DashboardAlumnoPage } from '../pages/dashboard-alumno/dashboard-alumno';
import { DashboardAlumnoPageModule } from '../pages/dashboard-alumno/dashboard-alumno.module';

import { LoginPage } from '../pages/login/login';
import { RutinasInstructorPage } from '../pages/rutinas-instructor/rutinas-instructor';
import { RutinasInstructorPageModule} from '../pages/rutinas-instructor/rutinas-instructor.module';

import { NuevoAlumnoPage } from '../pages/nuevo-alumno/nuevo-alumno';
import { UserProvider } from '../providers/user/user';
import { RoutineProvider } from '../providers/routine/routine';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    RutinasInstructorPageModule,
    AlumnosPageModule,
    InfoAlumnoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RutinasInstructorPage,
    AlumnosPage,
    InfoAlumnoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    RoutineProvider,
    LoginProvider
  ]
})
export class AppModule {}
