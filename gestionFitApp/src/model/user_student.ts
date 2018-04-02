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

	constructor(usernameUS:String,passwordUS:String,nameAndUsernameUS:String,mailUS:String,pathologiesUS:String, observationsUS:String,objectiveUS:String,birthdayUS:Date,telephoneUS:String,ageUS:Number,weigthUS:Number,measurementsUS:MeasuringTable,rutinesUS:Array<Routine>){
		this.username = usernameUS;
		this.password = passwordUS;
		this.nameAndSurname = nameAndUsernameUS;
		this.mail = mailUS;
		this.pathologies = pathologiesUS;
		this.observations = observationsUS;
		this.objective = objectiveUS;
		this.birthday = birthdayUS;
		this.weigth = weigthUS;
		this.measurements = measurementsUS;
		this.rutines = rutinesUS;
	}
}