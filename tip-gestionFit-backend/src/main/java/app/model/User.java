package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "\"user\"")
public class User {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	
	private String username;
	private String password;
	private String nameAndSurname;
	private String mail;
	private User_Role role;

	public User() {
		
	}
	
	
	public User(String user,String pass,String name,String email) {
		this.username = user;
		this.password = pass;
		this.nameAndSurname = name;
		this.mail = email;
	}
	
	

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNameAndSurname() {
		return nameAndSurname;
	}

	public void setNameAndSurname(String nameAndSurname) {
		this.nameAndSurname = nameAndSurname;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}


	public User_Role getRole() {
		return role;
	}


	public void setRole(User_Role role) {
		this.role = role;
	}
	
	
	

}
