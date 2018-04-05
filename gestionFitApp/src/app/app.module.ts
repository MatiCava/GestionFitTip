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

import { LoginPage } from '../pages/login/login';
import { RutinasPage } from '../pages/rutinas/rutinas';
import { RutinasPageModule} from '../pages/rutinas/rutinas.module';

import { NuevoAlumnoPage } from '../pages/nuevo-alumno/nuevo-alumno';
import { UserProvider } from '../providers/user/user';
import { RoutineProvider } from '../providers/routine/routine';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    RutinasPageModule,
    AlumnosPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RutinasPage,
    AlumnosPage
    
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
