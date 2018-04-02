import { Exercise } from '../model/exercise';


export class Routine{
	creationDate: Date;
	type: RoutineType;
	exercises: Array<Exercise>;

	constructor(creationDateR:Date,typeR:RoutineType,exercisesR:Array<Exercise>){
		this.creationDate = creationDateR;
		this.type = typeR;
		this.exercises = exercisesR;
	}  
}

export enum RoutineType{
	Strength,
	Resistance,
	Strength_Resistance,
	Muscular_Definition,
	Explosive_Force
}