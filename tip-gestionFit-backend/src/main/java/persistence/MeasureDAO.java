package persistence;

import org.springframework.stereotype.Repository;

import model.Measure;

@Repository
public class MeasureDAO extends GenericDAO<Measure>{
	
	public MeasureDAO() {
		super(Measure.class);
	}

}
