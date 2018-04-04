package app.service;

import java.util.Date;

import app.model.User_Student;
import app.persistence.UserDAO;

public class DataService {

	UserDAO userDAO = new UserDAO();
	
	public void createInitialData() {
		User_Student alu1 = new User_Student("alumno1","1234","Roberto","robert@gmail.com","","","",
				new Date(1995, 8, 12),"42856456",22,80.2f);
		this.userDAO.save(alu1);
	}
}
