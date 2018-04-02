export class Exercise {
	name: String;
	description: String;
	type: ExerciseType;

	constructor(nameE:String,descriptionE:String,typeE:ExerciseType){
		this.name = nameE;
		this.description = descriptionE;
		this.type = typeE;
	}
}

export enum ExerciseType{
	Upper_Body,
	Lower_Body,
	Arms,
	Warm_Up
}