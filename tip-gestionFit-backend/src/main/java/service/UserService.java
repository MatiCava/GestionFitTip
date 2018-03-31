package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import model.User;
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
}
