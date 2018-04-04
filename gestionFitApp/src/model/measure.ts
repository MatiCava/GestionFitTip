import { Measurement } from '../model/measurement'

export class Measure{
	name: String;
	measurements: Array<Measurement>;

	constructor(nameM:String){
		this.name = nameM;
		this.measurements = [];
	}
}