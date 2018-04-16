package app.service;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Measurement;
import app.model.MeasurementsAdapter;
import app.model.MeasuringTable;
import app.model.Routine;
import app.model.User;
import app.model.User_Role;
import app.model.User_Student;
import app.persistence.UserDAO;

@Service("userService")
public class UserService {

	@Autowired
	private UserDAO userDAO;
	
//	@Autowired
//	private MeasuringTableDAO tableDAO;
//	
	public UserService(){
		this.userDAO = new UserDAO();
//		this.tableDAO = new MeasuringTableDAO();
	}
	
	@Transactional
	public long saveStudent(User_Student user){
		Calendar birthCal = GregorianCalendar.getInstance();

        birthCal.setTime(user.getBirthday());
		
		int age = (GregorianCalendar.getInstance().get(Calendar.YEAR) - birthCal.get(Calendar.YEAR));
		
		user.setAge(age);
		
		ArgumentsValidator.validateStudent(user);


		return this.userDAO.save(user);
	}
	
	@Transactional
	public void updateStudent(User_Student newUser){
		ArgumentsValidator.validateStudent(newUser);
		
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
	public void newMeasurement(Long idUser,MeasurementsAdapter newMeasurement) {
		User_Student user = (User_Student) getById(idUser);

		Date day = new Date(newMeasurement.day);
		for(Measurement measure : newMeasurement.measures) {
			measure.day = day;
		}
		user.addMeasurements(newMeasurement.measures);
		updateStudent(user);
	}
	
	@Transactional
	public void newRutines(Long idUser,Routine newRutines) {
		User_Student user = (User_Student) getById(idUser);
		
		ArgumentsValidator.validateRoutine(newRutines);
		
		user.addRoutine(newRutines);
		updateStudent(user);
	}
	
	@Transactional
	public User getByUsername(String username) {
		return this.userDAO.getByUsername(username);
	}

	public MeasuringTable getStudentTable(Long idUser) {
		return this.userDAO.getStudent(idUser).getMeasurements();
	}
	
	public Set<Routine> getStudentRutines(Long idUser){
		return this.userDAO.getStudent(idUser).getRoutines();
	}


}
