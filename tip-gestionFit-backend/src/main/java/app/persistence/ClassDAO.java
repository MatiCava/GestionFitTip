package app.persistence;

import org.springframework.stereotype.Repository;

import app.model.Class_Student;

@Repository
public class ClassDAO extends GenericDAO<Class_Student> {
	
	public ClassDAO(){
		super(Class_Student.class);
	}

}
