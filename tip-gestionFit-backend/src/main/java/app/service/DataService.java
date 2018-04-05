package app.service;

import java.util.Date;

import app.model.Exercise;
import app.model.Exercise_Type;
import app.model.Routine;
import app.model.Routine_Type;
import app.model.User_Instructor;
import app.model.User_Student;
import app.persistence.ExerciseDAO;
import app.persistence.RoutineDAO;
import app.persistence.UserDAO;

public class DataService {

	UserDAO userDAO = new UserDAO();
	RoutineDAO routineDAO = new RoutineDAO();
	ExerciseDAO exerDAO = new ExerciseDAO();
	
	@SuppressWarnings("deprecation")
	public void createInitialData() {
		User_Student alu1 = new User_Student("alumno1","1234","Roberto Robertson","robert@gmail.com","","","",
				new Date(1995, 8, 12),"42856456",22,80.2f);
		
		User_Instructor inst1 = new User_Instructor("instructor1","1234","Fernando Fernandez", "ff@gmail.com");
		
		Exercise ex1 = new Exercise("Biceps", "3 series de 15 repeticiones", Exercise_Type.Arms);
		Exercise ex2 = new Exercise("Gemelos", "3 series de 15 repeticiones", Exercise_Type.Lower_Body);
		Exercise ex3 = new Exercise("Pectorales", "3 series de 15 repeticiones", Exercise_Type.Upper_Body);
		Exercise ex4 = new Exercise("Bicicleta fija", "10 minutos", Exercise_Type.Warm_Up);
		this.exerDAO.save(ex1);
		this.exerDAO.save(ex2);
		this.exerDAO.save(ex3);
		this.exerDAO.save(ex4);
		
		Routine rutina = new Routine(Routine_Type.Strength);
		rutina.addExercise(ex4);
		rutina.addExercise(ex1);
		rutina.addExercise(ex2);
		rutina.addExercise(ex3);
		this.routineDAO.save(rutina);
		
		alu1.addRoutine(rutina);
		this.userDAO.save(alu1);
		this.userDAO.save(inst1);
		
	}
}
