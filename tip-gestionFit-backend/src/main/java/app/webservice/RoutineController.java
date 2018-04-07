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

import app.model.Routine;
import app.model.UserNotFoundException;
import app.service.RoutineService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RoutineController {
	
	@Autowired
	private RoutineService routineServ = new RoutineService();
	

	@GetMapping(value = "/routines", produces = "application/json")   
	public List<Routine> getRoutines() {
		return this.routineServ.getAll();

	}


	@PostMapping(value = "/routine", produces = "application/json")   
	public ResponseEntity<Void> createRoutine(@RequestBody Routine routine) {
			this.routineServ.save(routine);
			return new ResponseEntity<Void>(HttpStatus.CREATED);

	}
	
	@GetMapping(value= "/routine/{id}",produces= "application/json")
	public Routine getRoutine(@PathVariable("id") Long idRoutine){
		Routine routine = this.routineServ.getById(idRoutine);
		if(routine == null) {
			throw new UserNotFoundException("Rutina no encontrada");
		}
		
		return routine;
	}
	
	@PutMapping(value = "/routine/{id}",produces = "application/json")
	public ResponseEntity<Void> updateRoutine(@PathVariable("id") Long idRoutine,@RequestBody Routine routine){
		Routine existingRoutine = this.routineServ.getById(idRoutine);
		if(existingRoutine == null) {
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		}
		routine.setId(idRoutine);
		this.routineServ.update(routine);
		return new ResponseEntity<Void>(HttpStatus.OK);
		
	}
	
	@DeleteMapping(value = "/routine/{id}", produces = "application/json")
	public ResponseEntity<Void> deleteRoutine(@PathVariable("id") Long idRoutine){
		this.routineServ.delete(this.routineServ.getById(idRoutine));
		return new ResponseEntity<Void>(HttpStatus.OK);
	}



}
