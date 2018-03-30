package persistence;

import org.springframework.stereotype.Repository;

import model.User;

@Repository
public class UserDAO extends GenericDAO<User> {

	public UserDAO() {
		super(User.class);
	}
}
