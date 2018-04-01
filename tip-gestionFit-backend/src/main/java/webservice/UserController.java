package webservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.User;
import model.UserNotFoundException;
import service.UserService;

@RestController
@RequestMapping(value="/api")
public class UserController {
	
	@Autowired
	private UserService userServ = new UserService();
	
	public UserController() {
		
	}
	
	@GetMapping(value = "/users", produces = "application/json")   
	public List<User> getUsers() {
		return this.userServ.getAll();

	}

	@PostMapping(value = "/user", produces = "application/json")   
	public ResponseEntity<Void> createUser(@RequestBody User user) {
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
