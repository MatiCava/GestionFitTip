package app.persistence;

import org.springframework.stereotype.Repository;

import app.model.Routine;

@Repository
public class RoutineDAO extends GenericDAO<Routine> {

	public RoutineDAO() {
		super(Routine.class);
	}
}
