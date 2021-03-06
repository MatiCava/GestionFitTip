package app.webservice;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import app.exception.NotFoundException;
import app.model.Class_Calendar;
import app.model.Class_Day;
import app.model.DayInstructor;
import app.model.DayStudent;
import app.model.MeasurementsAdapter;
import app.model.MeasuringTable;
import app.model.Promo;
import app.model.Routine;
import app.model.User;
import app.model.User_Instructor;
import app.model.User_Student;
import app.service.CalendarService;
import app.service.EmailService;
import app.service.UserService;


@RestController
@RequestMapping(value="/api")
@CrossOrigin
public class UserController {
	
	@Autowired
	private EmailService emailServ = new EmailService();
	
	@Autowired
	private UserService userServ = new UserService();
	
	@Autowired
	private CalendarService calServ = new CalendarService();

	
	
	@GetMapping(value = "/users", produces = "application/json")   
	public List<User> getUsers() throws Exception{
		return this.userServ.getAll();

	}
	
	@GetMapping(value = "/calendar", produces = "application/json")   
	public Class_Calendar getCalendar() throws Exception{
		return this.calServ.get();

	}
	
	@GetMapping(value = "/calendar/classes/{id}", produces = "application/json")
	public Set<Class_Day> getClasses(@PathVariable("id") Long idUser) throws Exception {
		User user = this.userServ.getById(idUser);
		return this.calServ.getClasses(user);
	}

	
	@GetMapping(value = "/alumnos", produces = "application/json")   
	public List<User_Student> getAlumnos() {
		return this.userServ.getAllStudents();

	}
	
	@PutMapping(value = "/instructor/addDays/{idInstructor}", produces = "application/json")
	public ResponseEntity<Void> addDaysToInstructor(@PathVariable("idInstructor") long id,@RequestBody Set<DayInstructor> days) throws Exception{
		this.userServ.addDaysInstructor(id,days);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@GetMapping(value = "/instructores", produces = "application/json")   
	public List<User_Instructor> getInstructors() {
		return this.userServ.getAllInstructors();

	}
	
	@PostMapping(value = "/instructor", produces = "application/json")   
	public ResponseEntity<Void> createInstructor(@RequestBody User_Instructor user) throws Exception {
			this.userServ.saveInstructor(user);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/instructor", produces = "application/json")   
	public ResponseEntity<Void> updateInstructor(@RequestBody User_Instructor user) throws Exception {
			this.userServ.updateInstructor(user);
			return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	
	
	@PutMapping(value = "/user/{id}/nuevaMedicion",produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Void> newMeasurements(@PathVariable("id") Long idUser,@RequestBody MeasurementsAdapter newMeasurements){
		this.userServ.newMeasurement(idUser, newMeasurements);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/user/{id}/nuevasRutinas",produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Void> newRutines(@PathVariable("id") Long idUser,@RequestBody List<Routine> newRoutines) throws Exception{
		this.userServ.newRutines(idUser, newRoutines);

		this.emailServ.sendEmailToUser(this.userServ.getById(idUser),EmailService.ROUTINE);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}


	
	@GetMapping(value= "/user/{id}",produces= "application/json")
	public User getUser(@PathVariable("id") Long idUser){
		User user = this.userServ.getById(idUser);
		if(user == null) {
			throw new NotFoundException("Usuario no encontrado");
		}
		
		return user;
	}
	
	@GetMapping(value= "/userDesktop/{mail}",produces= "application/json")
	public User getUserByEmail(@PathVariable("mail") String idUser){
		User user = this.userServ.getByMail(idUser);
		if(user == null) {
			throw new NotFoundException("Usuario no encontrado");
		}
		
		return user;
	}
	
	@GetMapping(value="/user/{id}/rutinas",produces= "application/json")
	public Set<Routine> getRutines(@PathVariable("id") Long idUser) {
		Set<Routine> rutines = this.userServ.getStudentRutines(idUser);
		return rutines;
	}
	
	@GetMapping(value="/user/{id}/table",produces= "application/json")
	public MeasuringTable getTable(@PathVariable("id") Long idUser) {
		MeasuringTable table = this.userServ.getStudentTable(idUser);
		if(table == null) {
			throw new NotFoundException("Usuario no encontrado");
		}
		return table;
	}
	
	@GetMapping(value="/studentPromedio/{id}", produces= "application/json")
	public int getPromedioStudent(@PathVariable("id") Long id){
		return this.userServ.getPromedioAsistencia(id);
	}
	
	@PutMapping(value = "/user/{id}",produces = "application/json")
	public ResponseEntity<Void> updateUser(@PathVariable("id") Long idUser,@RequestBody User_Student user){
		User existingUser = this.userServ.getById(idUser);
		if(existingUser == null) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		user.setId(idUser);
		this.userServ.updateStudent(user);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@DeleteMapping(value = "/user/{id}", produces = "application/json")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") Long idUser){
		this.userServ.delete(this.userServ.getById(idUser));
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PutMapping(value = "/addLessons/{idStudent}/{nLessons}", produces = "application/json")
	public ResponseEntity<Void> addLessonsToStudent(@PathVariable("idStudent") long id, @PathVariable("nLessons") int numLessons,@RequestBody List<DayStudent> days) throws Exception{
		this.userServ.addLessons(id,numLessons);
		this.userServ.addDays(id,days);
		
		this.calServ.addDays(days,this.userServ.getById(id).getNameAndSurname(),id);
		this.emailServ.sendEmailToUser(this.userServ.getById(id), EmailService.PAID);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@PutMapping(value = "/addLessonsDesktop/{mail}/{nLessons}", produces = "application/json")
	public ResponseEntity<User> addLessonsToStudentDesktop(@PathVariable("mail") String mail, @PathVariable("nLessons") int numLessons ,@RequestBody List<DayStudent> days) throws Exception{
		User user = this.userServ.getByMail(mail);
		this.userServ.addLessons(user.getId(),numLessons);
		this.userServ.addDays(user.id,days);
		this.calServ.addDays(days,user.getNameAndSurname(),user.id);
		this.emailServ.sendEmailToUser(this.userServ.getByMail(mail), EmailService.PAID);
		return new ResponseEntity<User>(user,HttpStatus.OK);
		
	}
	
	@PostMapping(value = "/assist/student/{id}",produces="application/json")
	public ResponseEntity<User> studentAssist(@PathVariable("id") String id) throws Exception{
		User_Student user;
		this.userServ.studentAssist(id);
		user = (User_Student) this.userServ.getByRfid(id);
		this.calServ.markAssist(user.id);


		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	@PostMapping(value="/addRfid/{mail}/{rfid}",produces = "application/json")
	public ResponseEntity<User> addRfid(@PathVariable("mail") String mail,@PathVariable("rfid") String rfid) throws Exception{
		User_Student user =(User_Student) this.userServ.getByMail(mail);
		user.setRfid(rfid);
		this.userServ.updateStudent(user);
		return new ResponseEntity<User>(user,HttpStatus.OK);
		
	}
	
	@GetMapping(value="/daysInstructor",produces = "application/json")
	public List<DayInstructor> getInstructorDays() {
		return this.calServ.getInstructorDays();
	}
	
	@PostMapping(value = "/promo",produces="application/json")
	public ResponseEntity<Void> promoStudents(@RequestBody Promo promo) throws Exception{
		List<User_Student> students =  this.getAlumnos();
		this.emailServ.sendPromoToUsers(students, promo);

		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@GetMapping(value = "/checkUsername/{username}", produces="application/json")
	public ResponseEntity<Boolean> checkUsername(@PathVariable("username") String username){
		return new ResponseEntity<Boolean>(this.userServ.checkUsername(username),HttpStatus.OK);
	}
	
	@GetMapping(value = "/checkEmail/{email}", produces="application/json")
	public ResponseEntity<Boolean> checkEmail(@PathVariable("email") String email){
		return new ResponseEntity<Boolean>(this.userServ.checkEmail(email),HttpStatus.OK);
	}

}
