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
import app.model.MeasurementsAdapter;
import app.model.MeasuringTable;
import app.model.Promo;
import app.model.Routine;
import app.model.User;
import app.model.User_Student;
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

	
	
	@GetMapping(value = "/users", produces = "application/json")   
	public List<User> getUsers() throws Exception{
		return this.userServ.getAll();

	}
	
	
	@GetMapping(value = "/alumnos", produces = "application/json")   
	public List<User_Student> getAlumnos() {
		return this.userServ.getAllStudents();

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
	public ResponseEntity<Void> addLessonsToStudent(@PathVariable("idStudent") long id, @PathVariable("nLessons") int numLessons ) throws Exception{
		this.userServ.addLessons(id,numLessons);
		this.emailServ.sendEmailToUser(this.userServ.getById(id), EmailService.PAID);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@PostMapping(value = "/assist/student/{id}",produces="application/json")
	public ResponseEntity<User> studentAssist(@PathVariable("id") String id) throws Exception{
		User_Student user;
		this.userServ.studentAssist(id);
		user = (User_Student) this.userServ.getByRfid(id);
		this.emailServ.sendEmailToUser(user,EmailService.ASSIST);
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	@PostMapping(value="/addRfid/{mail}/{rfid}",produces = "application/json")
	public ResponseEntity<Void> addRfid(@PathVariable("mail") String mail,@PathVariable("rfid") String rfid){
		//habria que checkear que no exista otro usuario con ese rfid
		User_Student user =(User_Student) this.userServ.getByMail(mail);
		user.setRfid(rfid);
		this.userServ.updateStudent(user);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@PostMapping(value = "/promo",produces="application/json")
	public ResponseEntity<Void> promoStudents(@RequestBody Promo promo) throws Exception{
		List<User_Student> students =  this.getAlumnos();
		for(User_Student student : students){
			System.out.println(student);
			this.emailServ.sendPromoToUser(student, promo);
		}
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
