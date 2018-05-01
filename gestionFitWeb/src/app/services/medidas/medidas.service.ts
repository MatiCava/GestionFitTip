import { Injectable } from '@angular/core';

@Injectable()
export class MedidasService {

  medidas:any=[];

  constructor() { }

  saveMedidas(medidasN){
    this.medidas = medidasN;
    console.log(this.medidas)
  }

  getMedidas(){
    return this.medidas;
  }

}
