package model;

import javax.persistence.Entity;

@Entity
public class User_Instructor extends User {

	public User_Instructor(String user, String pass, String name) {
		super(user, pass, name);
	}

}
