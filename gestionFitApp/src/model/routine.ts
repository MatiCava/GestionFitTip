import { Exercise } from '../model/exercise';


export class Routine{
	creationDate: Date;
	type: Routine_Type;
	exercises: Array<Exercise>;

	constructor(creationDateR:Date,typeR:Routine_Type,exercisesR:Array<Exercise>){
		this.creationDate = creationDateR;
		this.type = typeR;
		this.exercises = exercisesR;
	}  
}

export enum Routine_Type{
	Strength,
	Resistance,
	Strength_Resistance,
	Muscular_Definition,
	Explosive_Force
}