package app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
import app.persistence.UserDAO;


@Service
public class DataService {
	
	@Autowired
	RoutineService routineServ;
	@Autowired
	UserDAO userDAO ;
	@Autowired
	UserService userServ;
	@Autowired
	ExerciseService exerServ;
	@Autowired
	CalendarService calServ;
	
	public DataService(){
		this.routineServ = new RoutineService();
		this.userDAO = new UserDAO();
		this.exerServ = new ExerciseService();
		this.calServ = new CalendarService();
		this.userServ = new UserService();
	}

	
	public void createInitialData() {
		
		calServ.save(new Class_Calendar());
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User_Admin admin= new User_Admin("lovemylife",encoder.encode("1234"),"LoveMyLife","lovemylife@gmail.com");
		
		Date date = new GregorianCalendar(2018, 04, 01).getTime();
		
		User_Student alu1 = new User_Student("https://www.unilad.co.uk/wp-content/uploads/2017/11/Toni-Kelly-top-img.jpg","alumno1",encoder.encode("1234"),"Roberta Robertson","rr@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42658715",55f);
		alu1.setRemainingLessons(4);
		User_Student alu2 = new User_Student("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/4O5xXKj/very-beautiful-and-nice-girl-in-glasses-makes-selfie-near-the-office-woman-smiling-and-photographed-themselves-on-the-phone-she-is-happy_hdhani5__F0000.png","alumno2",encoder.encode("1234"),"Carla Perez","carlita@gmail.com","Escoliosis","","Ganar masa muscular",
				new GregorianCalendar(1985, 9,25).getTime(),"42856456",48.3f);
		User_Student alu3 = new User_Student("https://i2-prod.mirror.co.uk/incoming/article11864893.ece/ALTERNATES/s615b/Woman-smiles-with-best-pal-in-black-belt-in-chilling-final-selfie-before-using-same-accessory-to.jpg","alumno3",encoder.encode("1234"),"Rocio Dominguez","rodom@gmail.com","","Dolores lumbares y cervicales","Bajar de peso",
				new GregorianCalendar(1992, 10,13).getTime(),"42729279",61f);
		User_Student alu4 = new User_Student("https://s.aolcdn.com/hss/storage/midas/9d116765fc78dccb4b3a67c7f4f4a9c1/203812133/Screen+Shot+2016-05-12+at+3.49.43+PM.png","alumno4",encoder.encode("1234"),"Sofia Galarza","soso@gmail.com","","","Mantener peso actual",
				new GregorianCalendar(1983, 8,17).getTime(),"15967842",57f);
		User_Student alu5 = new User_Student("https://metrouk2.files.wordpress.com/2015/08/cmrxjeoweaadolv.jpg","alumno5",encoder.encode("1234"),"Jorge Paoli","elSampa@gmail.com","","","Fortalecer brazos",
				new GregorianCalendar(1990, 2,7).getTime(),"42726985",80.2f);
		User_Student alu6 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu7 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Student alu8 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno2",encoder.encode("123"),"Carlos Perez","maticava96@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		
		User_Instructor inst1 = new User_Instructor("instructor1",encoder.encode("1234"),"Fernando Fernandez", "ff@gmail.com");
		User_Instructor inst2 = new User_Instructor("instructor2",encoder.encode("1234"),"Zaira Ferreira", "zfpilates@gmail.com");

		
		Exercise ex1 = new Exercise("Curl de biceps con mancuernas", "3(series)x10(repeticiones)x15(Pausa)", Exercise_Type.Arms);
		Exercise ex2 = new Exercise("Sentadillas sostenidas", "4(series)x10(repeticiones)x15(pausa)", Exercise_Type.Lower_Body);
		Exercise ex3 = new Exercise("Traccion de pecho con sogas", "4(series)x10(repeticiones)x15(pausa)", Exercise_Type.Upper_Body);
		Exercise ex4 = new Exercise("Bicicleta fija", "10 minutos", Exercise_Type.Warm_Up);
		Exercise ex5 = new Exercise("Pies a la barra posicion V", "6(series)x10(repeticiones)x10(pausa)", Exercise_Type.Warm_Up);
		Exercise ex6 = new Exercise("Mov. articulares de brazos", "5 minutos", Exercise_Type.Warm_Up);
		Exercise ex7 = new Exercise("Traccion de biceps con sogas", "4(series)x10(repeticiones)x15(pausa)", Exercise_Type.Arms);
		Exercise ex8 = new Exercise("Estocadas", "4(series)x5(repeticiones)x20(pausa) cada pierna", Exercise_Type.Lower_Body);
		Exercise ex9 = new Exercise("Espinales en barrel", "3(series)x10(repeticiones)x15(pausa)", Exercise_Type.Upper_Body);

		this.exerServ.save(ex1);
		this.exerServ.save(ex2);
		this.exerServ.save(ex3);
		this.exerServ.save(ex4);
		this.exerServ.save(ex5);
		this.exerServ.save(ex6);
		this.exerServ.save(ex7);
		this.exerServ.save(ex8);
		this.exerServ.save(ex9);
		
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
		Routine rutina = new Routine("Rutina de fuerza (tren superior+zona media)",Routine_Type.Strength);
		Routine rutina2 = new Routine("Rutina de alta intensidad", Routine_Type.Explosive_Force);
		Routine rutina3 = new Routine("Rutina para principiantes", Routine_Type.Muscular_Definition);
		Routine rutina4 = new Routine("Rutina cardio ", Routine_Type.Resistance);
		Routine rutina5 = new Routine("Rutina alumnos avanzados", Routine_Type.Strength_Resistance);
		ex4.id=null;
		ex4.isTemplate = false;
		ex1.id=null;
		ex1.isTemplate = false;
		ex2.id=null;
		ex2.isTemplate = false;
		ex3.id=null;
		ex3.isTemplate = false;
		ex4.id=null;
		ex4.isTemplate = false;
		ex5.id=null;
		ex5.isTemplate = false;
		ex6.id=null;
		ex6.isTemplate = false;
		ex7.id=null;
		ex7.isTemplate = false;
		ex8.id=null;
		ex8.isTemplate = false;
		ex9.id=null;
		ex9.isTemplate = false;

		rutina.addExercise(ex4);
		rutina.addExercise(ex1);
		rutina.addExercise(ex2);
		rutina.addExercise(ex3);
		
		rutina2.addExercise(ex4);
		
		rutina3.addExercise(ex5);
		rutina3.addExercise(ex6);
		rutina3.addExercise(ex8);
		rutina3.addExercise(ex7);
		rutina3.addExercise(ex2);
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
		dayI1.setDay("SATURDAY");
		Set<DayInstructor> classes = new HashSet<>();
		classes.add(dayI1);
		
		DayInstructor dayI2 = new DayInstructor();
		StartEndHour sten2= new StartEndHour();
		sten2.setStartHour(13);
		sten2.setEndHour(20);
		Set<StartEndHour> stens2= new HashSet<>();
		stens2.add(sten2);
		dayI2.setStartEndHours(stens2);
		dayI2.setDay("TUESDAY");

		DayInstructor dayI3 = new DayInstructor();
		StartEndHour sten3= new StartEndHour();
		sten3.setStartHour(13);
		sten3.setEndHour(20);
		Set<StartEndHour> stens3= new HashSet<>();
		stens3.add(sten3);
		dayI3.setStartEndHours(stens3);
		dayI3.setDay("FRIDAY");
		
		Set<DayInstructor> classes2 = new HashSet<>();
		classes2.add(dayI2);
		classes2.add(dayI3);
		
		
		this.userDAO.save(alu1);
		this.userDAO.save(alu2);
		this.userDAO.save(alu3);
		this.userDAO.save(alu4);
		this.userDAO.save(alu5);
		this.userDAO.save(inst1);
		this.userDAO.save(inst2);
		this.userDAO.save(admin);
		

		
		DayStudent day1 = new DayStudent("SATURDAY",10,11);
		
		List<DayStudent> days = new ArrayList<DayStudent>();
		
		days.add(day1);
		
		DayStudent day2 = new DayStudent("TUESDAY",16,17);
		DayStudent day3 = new DayStudent("FRIDAY",16,17);
		
		List<DayStudent> days2 = new ArrayList<DayStudent>();
		
		days2.add(day2);
		days2.add(day3);
		
		this.userServ.addDays(alu1.id, days);
		this.userServ.addDays(alu2.id, days2);

		this.userServ.addDaysInstructor(inst2.id, classes);
		this.userServ.addDaysInstructor(inst1.id, classes2);

		
		this.calServ.addDays(days, alu1.getNameAndSurname(), alu1.id);
		this.calServ.addDays(days2, alu2.getNameAndSurname(), alu2.id);
			
	}
	
	
}
