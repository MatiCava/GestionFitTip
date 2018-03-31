package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import model.Measurement;
import model.User;
import model.User_Student;
import persistence.UserDAO;

@Service
public class UserService {

	@Autowired
	private UserDAO userDAO;
	
	public UserService(){
		this.userDAO = new UserDAO();
	}
	
	@Transactional
	public void save(User newUser){
		ArgumentsValidator.isInvalidFullName(newUser.getNameAndSurname());
		ArgumentsValidator.isNotAValidMailAddress(newUser.getMail());
		this.userDAO.save(newUser);
	}
	
	@Transactional
	public void update(User newUser){
		this.userDAO.update(newUser);
	}
	
	@Transactional
	public void delete(User user){
		this.userDAO.delete(user);
	}
	
	@Transactional
	public User getById(Long id){
		return this.userDAO.getById(id);
	}
	
	@Transactional
	public List<User> getAll(){
		return this.userDAO.getAll();
	}
	
	@Transactional
	public void newMeasurement(Long idUser,List<Measurement> newMeasurement) {
		User_Student user = (User_Student) getById(idUser);
		user.getMeasurements().addNewMeasurement(newMeasurement);
		update(user);
	}

}
