export class Measurement{
	day: Date;
	measure: Number;
	height: Number;

	constructor(dayM: Date, measureM: Number, heightM: Number){
		this.day = dayM;
		this.measure = measureM;
		this.height = heightM;
	}
}