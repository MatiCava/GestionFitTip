package app.service;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Measurement;
import app.model.MeasurementsAdapter;
import app.model.MeasuringTable;
import app.model.Routine;
import app.model.User;
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
	public long saveStudent(User_Student user){
		Calendar birthCal = GregorianCalendar.getInstance();

        birthCal.setTime(user.getBirthday());
		
		int age = (GregorianCalendar.getInstance().get(Calendar.YEAR) - birthCal.get(Calendar.YEAR));
		
		user.setAge(age);
		
		ArgumentsValidator.validateStudent(user);
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("STUDENT");

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
		return this.userDAO.getAllUserRole("STUDENT");
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
	public void newRutines(Long idUser,List<Routine> newRutines) {
		User_Student user = (User_Student) getById(idUser);
		
		
		user.setRutines(new HashSet<Routine>(newRutines));
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

	@Transactional
	public void addLessons(long id, int numLessons) {
		User_Student user = (User_Student) this.getById(id);
		int newRLessons = user.getRemainingLessons() + numLessons;
		user.setRemainingLessons(newRLessons);
		this.updateStudent(user);
	}
	
	
	//Falta agregar la asistencia a un log
	@Transactional
	public void studentAssist(long id){
		User_Student user = (User_Student) this.getById(id);
		user.substractRemainingLessons();
		this.updateStudent(user);
	}


}
