import { Measure } from '../model/measure'

export class MeasuringTable{

	measures: Array<Measure>;

	constructor(){
		this.measures = [new Measure("Chest"), new Measure("Arm"),new Measure("Waist"),new Measure("Abdomen"),new Measure("Glute"),new Measure("Thigh"),new Measure("Calf muscle")];
	}	
}