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


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumno/nuevaRutina/:id', component: RutinasInstructorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnosComponent,
    RutinasInstructorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule],
  providers: [LoginService, AlumnosService, RoutineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
