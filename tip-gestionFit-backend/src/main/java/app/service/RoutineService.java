package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Routine;
import app.persistence.RoutineDAO;

@Service
public class RoutineService {

	@Autowired
	private RoutineDAO routineDAO;
	
	public RoutineService(){
		this.routineDAO = new RoutineDAO();
	}
	
	@Transactional
	public void save(Routine newRoutine){
		this.routineDAO.save(newRoutine);
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
}
