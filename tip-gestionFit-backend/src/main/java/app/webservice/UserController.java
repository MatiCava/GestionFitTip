package app.webservice;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import app.model.Credential;
import app.model.Measurement;
import app.model.MeasuringTable;
import app.model.User;
import app.model.UserNotFoundException;
import app.model.User_Student;
import app.service.UserService;

@RestController
@RequestMapping(value="/api")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userServ = new UserService() ;
	

	@GetMapping(value = "/users", produces = "application/json")   
	public List<User> getUsers() {
		return this.userServ.getAll();

	}
	
	@PostMapping(value = "/login", produces = "application/json")
	public User login(@RequestBody Credential cred) {
		User user = this.userServ.getByUsername(cred.username);
		if(user == null) {
			throw new UserNotFoundException("No exite usuario con ese username");
		}
		
		System.out.println(user.getPassword());
		System.out.println(cred.password);
		if(!user.getPassword().equals(cred.password)) {
			throw new RuntimeException("Password incorrecto");
		}
		
		return user;
		
	}
	
	@GetMapping(value = "/alumnos", produces = "application/json")   
	public List<User_Student> getAlumnos() {
		return this.userServ.getAllStudents();

	}
	
	@PostMapping(value = "/user/{id}/nuevaMedicion",produces = "application/json")
	public ResponseEntity<Void> newMeasurements(@PathVariable("id") Long idUser,@RequestBody List<Measurement> newMeasurements){
		this.userServ.newMeasurement(idUser, newMeasurements);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping(value = "/alumno", produces = "application/json")   
	public ResponseEntity<Void> createUser(@RequestBody User_Student user) {
			this.userServ.save(user);
			return new ResponseEntity<Void>(HttpStatus.CREATED);

	}
	
	@GetMapping(value= "/user/{id}",produces= "application/json")
	public User getUser(@PathVariable("id") Long idUser){
		User user = this.userServ.getById(idUser);
		if(user == null) {
			throw new UserNotFoundException("Usuario no encontrado");
		}
		
		return user;
	}
	
	@GetMapping(value="/user/{id}/table",produces= "application/json")
	public MeasuringTable getTable(@PathVariable("id") Long idUser) {
		MeasuringTable table = this.userServ.getStudentTable(idUser);
		if(table == null) {
			throw new UserNotFoundException("Usuario no encontrado");
		}
		return table;
	}
	
	@PutMapping(value = "/user/{id}",produces = "application/json")
	public ResponseEntity<Void> updateUser(@PathVariable("id") Long idUser,@RequestBody User user){
		User existingUser = this.userServ.getById(idUser);
		if(existingUser == null) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		user.setId(idUser);
		this.userServ.update(user);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@DeleteMapping(value = "/user/{id}", produces = "application/json")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") Long idUser){
		this.userServ.delete(this.userServ.getById(idUser));
		return new ResponseEntity<Void>(HttpStatus.OK);
	}



}
