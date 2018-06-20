import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';


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
import { ListaEjerciciosComponent } from './lista-ejercicios/lista-ejercicios.component';
import { InfoEjercicioComponent } from './info-ejercicio/info-ejercicio.component';
import { EditarEjercicioComponent } from './editar-ejercicio/editar-ejercicio.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PromosComponent } from './promos/promos.component';
import { PipesModule } from './pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgregarClasesComponent } from './agregar-clases/agregar-clases.component'; 
import { NgxInputFileUploadModule } from 'ngx-input-file-upload';
import { NuevaRutinaAsignarComponent } from './nueva-rutina-asignar/nueva-rutina-asignar.component';
import { NuevoEjercicioAsignarComponent } from './nuevo-ejercicio-asignar/nuevo-ejercicio-asignar.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarioGeneralComponent } from './calendario-general/calendario-general.component';
import { ChartsModule } from 'ng2-charts';

import { InstructoresComponent } from './instructores/instructores.component';
import { AgregarClasesInstructorComponent } from './agregar-clases-instructor/agregar-clases-instructor.component';
import { InfoInstructorComponent } from './info-instructor/info-instructor.component';
import { NuevoInstructorComponent } from './nuevo-instructor/nuevo-instructor.component';


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
  { path: 'promos', component: PromosComponent },
  { path: 'alumno/info/:id', component: InfoAlumnoComponent },
  { path: 'alumno/rutinas/:id', component: RutinasInstructorComponent },
  { path: 'alumno/mediciones/:id', component: MedicionesInstructorComponent },
  { path: 'rutinas', component: ListaRutinasComponent},
  { path: 'rutina/info/:id', component: InfoRutinaComponent},
  { path: 'rutina/edit/:id', component: EditarRutinaComponent},
  { path: 'rutinas/nueva', component: NuevaRutinaComponent },
  { path: 'alumno/nuevaRutina/:id', component: RutinasInstructorComponent },
  { path: 'alumno/medicion/nueva/:id', component: NuevaMedicionComponent },
  { path: 'ejercicios', component: ListaEjerciciosComponent},
  { path: 'ejercicio/info/:id', component: InfoEjercicioComponent },
  { path: 'ejercicio/edit/:id', component: EditarEjercicioComponent },
  { path: 'ejercicios/nuevo' , component: NuevoEjercicioComponent },
  { path: 'alumno/clases/agregar/:idUser', component: AgregarClasesComponent},
  { path: 'calendario-general',component: CalendarioGeneralComponent},
  { path: 'instructores', component: InstructoresComponent },
  { path: 'instructor/info/:id', component: InfoInstructorComponent},
  { path: 'instructor/clases/agregar/:id', component: AgregarClasesInstructorComponent},
  { path: 'instructor/nuevo', component: NuevoInstructorComponent}
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
    ListaEjerciciosComponent,
    EditarEjercicioComponent,
    InfoEjercicioComponent,
    PromosComponent,
    AgregarClasesComponent,
    NuevaRutinaAsignarComponent,
    NuevoEjercicioAsignarComponent,
    CalendarioComponent,
    CalendarioGeneralComponent,
    InstructoresComponent,
    AgregarClasesInstructorComponent,
    InfoInstructorComponent,
    NuevoInstructorComponent
    
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PipesModule,
    NgxPaginationModule,
    NgxInputFileUploadModule,
    HttpModule,
    NgxSpinnerModule,
    ChartsModule
  ],
  entryComponents: [],
  exports: [RouterModule],
  providers: [LoginService, AlumnosService, RoutineService,MedidasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
