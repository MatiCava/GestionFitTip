package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class Routine {
	
	public Date creationDate;
	public Routine_Type type;
	public List<Exercise> exercises;
	
	public Routine() {
		
	}
	
	public Routine( Routine_Type typeR) {
		this.creationDate = new Date();
		this.type = typeR;
		this.exercises = new ArrayList<Exercise>();
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
