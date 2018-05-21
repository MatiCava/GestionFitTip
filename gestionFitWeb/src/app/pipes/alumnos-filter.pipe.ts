import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumnosFilter'
})
export class AlumnosFilterPipe implements PipeTransform {

  transform(alumnos: any[], searchText: String): any[] {
    if(!alumnos) return [];
    if(!searchText) return alumnos;
    searchText = searchText.toLowerCase();
    return alumnos.filter( alumno => {
      return alumno.nameAndSurname.toLowerCase().includes(searchText);
    });
  }
}
