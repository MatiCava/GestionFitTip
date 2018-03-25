package model;

public class User {
	
	private String username;
	private String password;
	private String nameAndSurname;
	
	public User(String user,String pass,String name) {
		this.username = user;
		this.password = pass;
		this.nameAndSurname = name;
		
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
	
	
	

}
