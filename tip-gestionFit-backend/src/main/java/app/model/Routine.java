package app.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Routine {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	public Date creationDate;
	@Enumerated
	public Routine_Type type;
	@OneToMany(cascade = {CascadeType.ALL})
	public List<Exercise> exercises;
	
	public Routine() {
		
	}
	
	public Routine( Routine_Type typeR) {
		this.creationDate = new Date();
		this.type = typeR;
		this.exercises = new ArrayList<Exercise>();
	}
	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void addExercise(Exercise newExercise) {
		this.exercises.add(newExercise);
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Routine_Type getType() {
		return type;
	}

	public void setType(Routine_Type type) {
		this.type = type;
	}

	public List<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(List<Exercise> exercises) {
		this.exercises = exercises;
	}
	
	

}
