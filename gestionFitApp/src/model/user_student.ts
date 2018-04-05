import { MeasuringTable } from '../model/measuringTable';
import { Routine } from '../model/routine';


export class User_Student{

	username: String;
	password: String;
	nameAndSurname: String;
	mail: String;
	pathologies: String;
	observations: String;
	objective: String;
	birthday: Date;
	telephone: String;
	age: Number;
	weigth: Number;
	measurements: MeasuringTable;
	rutines: Array<Routine>;
	role: User_Role;

	constructor(usernameUS:String,passwordUS:String,nameAndUsernameUS:String,mailUS:String,pathologiesUS:String, observationsUS:String,objectiveUS:String,
		birthdayUS:Date,telephoneUS:String,ageUS:Number,weigthUS:Number,measurementsUS:MeasuringTable,roleUS:User_Role){
		this.username = usernameUS;
		this.password = passwordUS;
		this.nameAndSurname = nameAndUsernameUS;
		this.mail = mailUS;
		this.pathologies = pathologiesUS;
		this.observations = observationsUS;
		this.objective = objectiveUS;
		this.birthday = birthdayUS;
		this.weigth = weigthUS;
		this.measurements = new MeasuringTable();
		this.rutines = [];
		this.role = roleUS;

	}

}

export enum User_Role{
	Student,Instructor
}