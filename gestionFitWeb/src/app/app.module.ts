import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginService } from './services/login/login.service';
import { AlumnosService } from './services/alumnos/alumnos.service';
import { RoutineService } from './services/routine/routine.service';
import { RutinasInstructorComponent } from './rutinas-instructor/rutinas-instructor.component';
import { InfoAlumnoComponent } from './info-alumno/info-alumno.component';
import { MedicionesInstructorComponent } from './mediciones-instructor/mediciones-instructor.component';
import { NuevaMedicionComponent } from './nueva-medicion/nueva-medicion.component';
import { NuevoEjercicioComponent } from './nuevo-ejercicio/nuevo-ejercicio.component';
import { NuevaRutinaComponent } from './nueva-rutina/nueva-rutina.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumno/info/:id', component: InfoAlumnoComponent },
  { path: 'alumno/nuevaRutina/:id', component: RutinasInstructorComponent },
  { path: 'alumno/mediciones/:id',component: MedicionesInstructorComponent },
  { path: 'rutinas/nueva',component: NuevaRutinaComponent },
  { path: 'alumno/medicion/nueva/:id', component: NuevaMedicionComponent },
  { path: 'ejercicios/nuevo' , component: NuevoEjercicioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnosComponent,
    RutinasInstructorComponent,
    InfoAlumnoComponent,
    MedicionesInstructorComponent,
    NuevaMedicionComponent,
    NuevoEjercicioComponent,
    NuevaRutinaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
      ,{ enableTracing: true }
    )
  ],
  exports: [RouterModule],
  providers: [LoginService, AlumnosService, RoutineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
