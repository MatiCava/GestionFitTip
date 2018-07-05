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

import app.exception.ExpiredLessonsException;
import app.exception.InsufficientLessonsException;
import app.exception.UserNotFoundException;
import app.model.DayInstructor;
import app.model.DayStudent;
import app.model.Measurement;
import app.model.MeasurementsAdapter;
import app.model.MeasuringTable;
import app.model.Routine;
import app.model.User;
import app.model.User_Admin;
import app.model.User_Instructor;
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
	public long saveInstructor(User_Instructor user){
		ArgumentsValidator.validateInstructor(user);
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		user.setPassword(encoder.encode(user.getPassword()));
		user.setRole("INSTRUCTOR");

		return this.userDAO.save(user);
	}
	
	@Transactional
	public void updateStudent(User_Student newUser){
		ArgumentsValidator.validateStudent(newUser);
		
		this.userDAO.update(newUser);
	}
	
	@Transactional
	public void updateInstructor(User_Instructor newUser){
		ArgumentsValidator.validateInstructor(newUser);
		
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
		return this.userDAO.getAllStudents();
	}
	
	@Transactional
	public List<User_Instructor> getAllInstructors(){
		return this.userDAO.getAllInstructors();
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
	
	@Transactional
	public User getByMail(String mail) throws UserNotFoundException {
		User_Student user = (User_Student) this.userDAO.getByMail(mail);
		if(user == null){
			throw new UserNotFoundException("Usuario no encontrado");
		}
		return user;
	}

	@Transactional
	public MeasuringTable getStudentTable(Long idUser) {
		return this.userDAO.getStudent(idUser).getMeasurements();
	}
	
	@Transactional
	public Set<Routine> getStudentRutines(Long idUser){
		return this.userDAO.getStudent(idUser).getRoutines();
	}

	@Transactional
	public void addLessons(long id, int numLessons) throws UserNotFoundException {
		User_Student user = (User_Student) this.getById(id);
		if(user == null){
			throw new UserNotFoundException("Usuario no encontrado");
		}
		int newRLessons = user.getRemainingLessons() + numLessons;
		user.setRemainingLessons(newRLessons);
		int totalClasses = user.getTotalClasses() + numLessons;
		user.setTotalClasses(totalClasses);
		
		//Fecha de pago
		user.setPaymentDate(new Date());
		
		//Seteo de expiracion en un mes
        Date dt = new Date();
        Calendar c = Calendar.getInstance(); 
        c.setTime(dt); 
        c.add(Calendar.MONTH, 1);
        dt = c.getTime();
        
        user.setLessonsExpires(dt);
		user.calculateAssitance();
        
		this.updateStudent(user);
	}
	
	
	//Se podria agregar un log
	@Transactional
	public void studentAssist(String id) throws InsufficientLessonsException,ExpiredLessonsException{
		User_Student user = (User_Student) this.getByRfid(id);
		if(user == null){
			throw new UserNotFoundException("Usuario no encontrado");
		}
		user.substractRemainingLessons();
		user.addNewLog();
		user.calculateAssitance();
		this.updateStudent(user);
	}

	@Transactional
	public boolean checkUsername(String username) {
		return this.userDAO.checkUsername(username);
	}

	@Transactional
	public User getByRfid(String id) {
		return this.userDAO.getByRfid(id);
	}

	@Transactional
	public Boolean checkEmail(String email) {
		return this.userDAO.checkEmail(email);
	}
	
	@Transactional
	public void addDays(long id,List<DayStudent> days) {
		User_Student user = (User_Student) this.userDAO.getById(id);
		if(days != user.getClassDays()){
			user.setClassDays(days);
			this.updateStudent(user);
		}

		
	}
	
	@Transactional
	public void addDaysInstructor(long id,Set<DayInstructor> days) {
		User_Instructor user = (User_Instructor) this.userDAO.getById(id);
		if(days != user.getClasses()){
			user.setClasses(days);
			this.updateInstructor(user);
		}

		
	}

	@Transactional
	public int getPromedioAsistencia(Long id) {
		User_Student user = (User_Student) this.userDAO.getById(id);
		return user.getAssistance();
	}

	@Transactional
	public long saveAdmin(User_Admin admin) {
		ArgumentsValidator.validateInstructor(admin);
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		admin.setPassword(encoder.encode(admin.getPassword()));
		admin.setRole("ADMIN");

		return this.userDAO.save(admin);
		
	}


}
