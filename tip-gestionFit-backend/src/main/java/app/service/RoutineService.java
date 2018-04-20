package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Exercise;
import app.model.Routine;
import app.persistence.ExerciseDAO;
import app.persistence.RoutineDAO;

@Service
public class RoutineService {

	@Autowired
	private RoutineDAO routineDAO;
	
	@Autowired
	private ExerciseDAO exerciseDAO;
	
	public RoutineService(){
		this.routineDAO = new RoutineDAO();
	}
	
	@Transactional
	public void save(Routine newRoutine){
		this.routineDAO.save(newRoutine);
	}
	
	@Transactional
	public void saveExercise(Exercise newExercise){
		this.exerciseDAO.save(newExercise);
	}
	
	@Transactional
	public void update(Routine newRoutine){
		this.routineDAO.update(newRoutine);
	}
	
	@Transactional
	public void delete(Routine routine){
		this.routineDAO.delete(routine);
	}
	
	@Transactional
	public Routine getById(Long id){
		return this.routineDAO.getById(id);
	}
	
	@Transactional
	public List<Routine> getAll(){
		return this.routineDAO.getAll();
	}

	@Transactional
	public List<Exercise> getExercises() {
		return this.exerciseDAO.getAll();
	}
}
