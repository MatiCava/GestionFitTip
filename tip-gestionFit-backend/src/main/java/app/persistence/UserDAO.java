package app.persistence;

import org.springframework.stereotype.Repository;

import app.model.User;

@Repository
public class UserDAO extends GenericDAO<User> {

	public UserDAO() {
		super(User.class);
	}
}
