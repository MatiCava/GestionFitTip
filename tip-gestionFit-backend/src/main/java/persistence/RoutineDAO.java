package persistence;

import org.springframework.stereotype.Repository;

import model.Routine;

@Repository
public class RoutineDAO extends GenericDAO<Routine> {

	public RoutineDAO() {
		super(Routine.class);
	}
}
