package app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import app.model.Class_Calendar;
import app.model.DayInstructor;
import app.model.DayStudent;
import app.model.Exercise;
import app.model.Exercise_Type;
import app.model.Measurement;
import app.model.Routine;
import app.model.Routine_Type;
import app.model.StartEndHour;
import app.model.User_Admin;
import app.model.User_Instructor;
import app.model.User_Student;

public class DataService {
	
	RoutineService routineServ = new RoutineService();
	UserService userServ = new UserService();
	ExerciseService exerServ = new ExerciseService();
	CalendarService calServ = new CalendarService();

	
	public void createInitialData() {
		
		calServ.save(new Class_Calendar());
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User_Admin admin= new User_Admin("lovemylife",encoder.encode("1234"),"LoveMyLife","lovemylife@gmail.com");
		
		Date date = new GregorianCalendar(2018, 04, 01).getTime();
		
		User_Student alu1 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno1",encoder.encode("1234"),"Roberto Robertson","gastonveliez95@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		alu1.setRemainingLessons(4);
		User_Student alu2 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu3 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno3",encoder.encode("123"),"Carlos Perez","Carlito@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu4 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu5 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu6 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu7 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu8 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		
		this.userServ.saveStudent(alu3);
		User_Instructor inst1 = new User_Instructor("instructor1",encoder.encode("1234"),"Fernando Fernandez", "ff@gmail.com");
		User_Instructor inst2 = new User_Instructor("instructor2",encoder.encode("1234"),"Zaira Ferreira", "zfpilates@gmail.com");

		
		Exercise ex1 = new Exercise("Biceps", "3 series de 15 repeticiones", Exercise_Type.Arms);
		Exercise ex2 = new Exercise("Gemelos", "3 series de 15 repeticiones", Exercise_Type.Lower_Body);
		Exercise ex3 = new Exercise("Pectorales", "3 series de 15 repeticiones", Exercise_Type.Upper_Body);
		Exercise ex4 = new Exercise("Bicicleta fija", "10 minutos", Exercise_Type.Warm_Up);
		this.exerServ.save(ex1);
		this.exerServ.save(ex2);
		this.exerServ.save(ex3);
		this.exerServ.save(ex4);
		
		Measurement med1 = new Measurement(date,70,130);
		Measurement med2 = new Measurement(date,70,130);
		Measurement med3 = new Measurement(date,70,130);
		Measurement med4 = new Measurement(date,70,130);
		Measurement med5 = new Measurement(date,70,130);
		Measurement med6 = new Measurement(date,70,130);
		Measurement med7 = new Measurement(date,70,130);
		
		Measurement med8 = new Measurement(date,75,130);
		Measurement med9 = new Measurement(date,68,130);
		Measurement med10 = new Measurement(date,70,130);
		Measurement med11 = new Measurement(date,68,130);
		Measurement med12 = new Measurement(date,70,130);
		Measurement med13 = new Measurement(date,70,130);
		Measurement med14 = new Measurement(date,70,130);
		
		Measurement med15 = new Measurement(date,72,130);
		Measurement med16 = new Measurement(date,65,130);
		Measurement med17 = new Measurement(date,71,130);
		Measurement med18 = new Measurement(date,65,130);
		Measurement med19 = new Measurement(date,70,130);
		Measurement med20 = new Measurement(date,70,130);
		Measurement med21 = new Measurement(date,70,130);
		
		List<Measurement> measures = new ArrayList<Measurement>();
		measures.add(med1);		
		measures.add(med2);
		measures.add(med3);
		measures.add(med4);
		measures.add(med5);
		measures.add(med6);
		measures.add(med7);
		
		List<Measurement> measures2 = new ArrayList<Measurement>();
		measures2.add(med8);		
		measures2.add(med9);
		measures2.add(med10);
		measures2.add(med11);
		measures2.add(med12);
		measures2.add(med13);
		measures2.add(med14);
		
		List<Measurement> measures3 = new ArrayList<Measurement>();
		measures3.add(med15);		
		measures3.add(med16);
		measures3.add(med17);
		measures3.add(med18);
		measures3.add(med19);
		measures3.add(med20);
		measures3.add(med21);
		
		

		alu1.addMeasurements(measures);
		alu1.addMeasurements(measures2);
		alu1.addMeasurements(measures3);
		Routine rutina = new Routine("Rutina de fuerza para brazos",Routine_Type.Strength);
		Routine rutina2 = new Routine("Rutina de fuerza explosiva", Routine_Type.Explosive_Force);
		Routine rutina3 = new Routine("Rutina de def muscular casi sin peso", Routine_Type.Muscular_Definition);
		Routine rutina4 = new Routine("Rutina de resistencia casi todo aerobico", Routine_Type.Resistance);
		Routine rutina5 = new Routine("Rutina de fuerza y resistencia mezcla balanceado", Routine_Type.Strength_Resistance);
		ex4.id=null;
		ex4.isTemplate = false;
		ex1.id=null;
		ex1.isTemplate = false;
		ex2.id=null;
		ex2.isTemplate = false;
		ex3.id=null;
		ex3.isTemplate = false;

		rutina.addExercise(ex4);
		rutina.addExercise(ex1);
		rutina.addExercise(ex2);
		rutina.addExercise(ex3);
		rutina2.addExercise(ex4);
		rutina3.addExercise(ex3);
		rutina4.addExercise(ex2);
		rutina5.addExercise(ex1);

		
		this.routineServ.save(rutina);
		this.routineServ.save(rutina2);
		this.routineServ.save(rutina3);
		this.routineServ.save(rutina4);
		this.routineServ.save(rutina5);
		List<Routine> routines = new ArrayList<Routine>();
		rutina.id = null;
		rutina.isTemplate = false;
		routines.add(rutina);
		alu1.addRoutine(routines);
		
		DayInstructor dayI1 = new DayInstructor();
		StartEndHour sten= new StartEndHour();
		sten.setStartHour(9);
		sten.setEndHour(16);
		Set<StartEndHour> stens= new HashSet<>();
		stens.add(sten);
		dayI1.setStartEndHours(stens);
		dayI1.setDay("TUESDAY");
		Set<DayInstructor> classes = new HashSet<>();
		classes.add(dayI1);
		
		this.userServ.saveStudent(alu1);
		this.userServ.saveStudent(alu2);
		this.userServ.saveInstructor(inst1);
		this.userServ.saveInstructor(inst2);
		this.userServ.saveAdmin(admin);
		

		
		DayStudent day1 = new DayStudent("TUESDAY",10,11);
		
		List<DayStudent> days = new ArrayList<DayStudent>();
		
		days.add(day1);
		
		this.userServ.addDays(alu1.id, days);
		this.userServ.addDaysInstructor(inst1.id, classes);

		
		this.calServ.addDays(days, alu1.getNameAndSurname(), alu1.id);
			
	}
	
	
}
