import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ListaRutinasComponent } from './lista-rutinas/lista-rutinas.component';
import { InfoRutinaComponent } from './info-rutina/info-rutina.component';
import { EditarRutinaComponent } from './editar-rutina/editar-rutina.component';
import { MedidasService } from './services/medidas/medidas.service';
import { EliminarRutinaDialogComponent } from './eliminar-rutina-dialog/eliminar-rutina-dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumno/info/:id', component: InfoAlumnoComponent },
  { path: 'alumno/rutinas/:id', component: RutinasInstructorComponent },
  { path: 'alumno/mediciones/:id', component: MedicionesInstructorComponent },
  { path: 'rutinas', component: ListaRutinasComponent},
  { path: 'rutina/info/:id', component: InfoRutinaComponent},
  { path: 'rutina/edit/:id', component: EditarRutinaComponent},
  { path: 'rutinas/nueva', component: NuevaRutinaComponent },
  { path: 'alumno/nuevaRutina/:id', component: RutinasInstructorComponent },
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
    NuevaRutinaComponent,
    ListaRutinasComponent,
    InfoRutinaComponent,
    EditarRutinaComponent,
    EliminarRutinaDialogComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [EliminarRutinaDialogComponent],
  exports: [RouterModule],
  providers: [LoginService, AlumnosService, RoutineService,MedidasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
