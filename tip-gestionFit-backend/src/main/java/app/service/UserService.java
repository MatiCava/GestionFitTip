package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Measurement;
import app.model.User;
import app.model.User_Instructor;
import app.model.User_Role;
import app.model.User_Student;
import app.persistence.UserDAO;

@Service("userService")
public class UserService {

	@Autowired
	private UserDAO userDAO;
	
	public UserService(){
		this.userDAO = new UserDAO();
	}
	
	@Transactional
	public void save(User user){
		if(user.getRole() == User_Role.Student) {
			ArgumentsValidator.validateStudent(user);
		}
		else {
			ArgumentsValidator.validateInstructor(user);

		}

		this.userDAO.save(user);
	}
	
	@Transactional
	public void update(User newUser){
		this.userDAO.update(newUser);
	}
	
	@Transactional
	public void delete(User user){
		this.userDAO.delete(user);
	}
	
	@Transactional
	public User getById(Long id){
		return this.userDAO.getById(id);
	}
	
	@Transactional
	public List<User> getAll(){
		return this.userDAO.getAll();
	}
	
	@Transactional
	public List<User_Student> getAllStudents(){
		return this.userDAO.getAllUserRole(User_Role.Student);
	}
	
	@Transactional
	public void newMeasurement(Long idUser,List<Measurement> newMeasurement) {
		User_Student user = (User_Student) getById(idUser);
		user.getMeasurements().addNewMeasurement(newMeasurement);
		update(user);
	}

}
