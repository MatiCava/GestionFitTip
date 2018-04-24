import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginService } from './login.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'alumnos', component: AlumnosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnosComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
