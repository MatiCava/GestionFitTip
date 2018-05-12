package app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import app.model.Exercise;
import app.model.Exercise_Type;
import app.model.Measurement;
import app.model.Routine;
import app.model.Routine_Type;
import app.model.User_Instructor;
import app.model.User_Student;
import app.persistence.ExerciseDAO;
import app.persistence.MeasureDAO;
import app.persistence.MeasuringTableDAO;
import app.persistence.RoutineDAO;
import app.persistence.UserDAO;

public class DataService {

	UserDAO userDAO = new UserDAO();
	RoutineDAO routineDAO = new RoutineDAO();
	ExerciseDAO exerDAO = new ExerciseDAO();
	MeasuringTableDAO tableDAO = new MeasuringTableDAO();
	MeasureDAO measureDAO = new MeasureDAO();
	
	public void createInitialData() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();

		Date date = new GregorianCalendar(2018, 04, 01).getTime();
		User_Student alu1 = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","alumno1",encoder.encode("1234"),"Roberto Robertson","gastonveliez95@gmail.com","","","Bajar de peso",
				new GregorianCalendar(1990, 5,8).getTime(),"42856456",80.2f);
		User_Instructor inst1 = new User_Instructor("instructor1",encoder.encode("1234"),"Fernando Fernandez", "ff@gmail.com");
		
		Exercise ex1 = new Exercise("Biceps", "3 series de 15 repeticiones", Exercise_Type.Arms);
		Exercise ex2 = new Exercise("Gemelos", "3 series de 15 repeticiones", Exercise_Type.Lower_Body);
		Exercise ex3 = new Exercise("Pectorales", "3 series de 15 repeticiones", Exercise_Type.Upper_Body);
		Exercise ex4 = new Exercise("Bicicleta fija", "10 minutos", Exercise_Type.Warm_Up);
		this.exerDAO.save(ex1);
		this.exerDAO.save(ex2);
		this.exerDAO.save(ex3);
		this.exerDAO.save(ex4);
		
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
		this.measureDAO.save(alu1.getMeasurements().measures.get(0));
		this.measureDAO.save(alu1.getMeasurements().measures.get(1));
		this.measureDAO.save(alu1.getMeasurements().measures.get(2));
		this.measureDAO.save(alu1.getMeasurements().measures.get(3));
		this.measureDAO.save(alu1.getMeasurements().measures.get(4));
		this.measureDAO.save(alu1.getMeasurements().measures.get(5));
		this.measureDAO.save(alu1.getMeasurements().measures.get(6));
		this.routineDAO.save(rutina);
		this.routineDAO.save(rutina2);
		this.routineDAO.save(rutina3);
		this.routineDAO.save(rutina4);
		this.routineDAO.save(rutina5);
		this.tableDAO.save(alu1.getMeasurements());
		List<Routine> routines = new ArrayList<Routine>();
		rutina.id = null;
		rutina.isTemplate = false;
		routines.add(rutina);
		alu1.addRoutine(routines);
		this.userDAO.save(alu1);
		this.userDAO.save(inst1);
		
	}
}
