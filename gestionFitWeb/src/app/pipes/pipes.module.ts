import { NgModule } from '@angular/core';
import { AlumnosFilterPipe } from './alumnos-filter.pipe';
import { RutinasEjerciciosFilterPipe } from './rutinas-ejercicios-filter.pipe';

@NgModule({
  declarations: [AlumnosFilterPipe, RutinasEjerciciosFilterPipe ],
  exports: [AlumnosFilterPipe, RutinasEjerciciosFilterPipe ]
})
export class PipesModule { }
