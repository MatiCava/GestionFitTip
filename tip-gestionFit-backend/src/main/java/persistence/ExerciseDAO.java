package persistence;

import org.springframework.stereotype.Repository;

import model.Exercise;

@Repository
public class ExerciseDAO extends GenericDAO<Exercise>{

	public ExerciseDAO() {
		super(Exercise.class);
	}
}
