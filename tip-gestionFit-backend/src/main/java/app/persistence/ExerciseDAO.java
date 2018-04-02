package app.persistence;

import org.springframework.stereotype.Repository;

import app.model.Exercise;

@Repository
public class ExerciseDAO extends GenericDAO<Exercise>{

	public ExerciseDAO() {
		super(Exercise.class);
	}
}
