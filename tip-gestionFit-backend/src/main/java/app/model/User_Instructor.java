package app.model;

import javax.persistence.Entity;

@Entity
public class User_Instructor extends User {
	
	public User_Instructor() {
		super();
		this.setRole(User_Role.Instructor);

	}

	public User_Instructor(String user, String pass, String name,String email) {
		super(user, pass, name, email);
		this.setRole(User_Role.Instructor);
	}

}
