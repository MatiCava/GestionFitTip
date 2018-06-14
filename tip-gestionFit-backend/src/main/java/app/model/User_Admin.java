package app.model;

public class User_Admin extends User {
	
	public User_Admin(){
		super();
		this.setRole("ADMIN");
	}
	
	public User_Admin(String user, String pass, String name,String email) {
		super(user, pass, name, email);
		this.setRole("ADMIN");
	}
	

}
