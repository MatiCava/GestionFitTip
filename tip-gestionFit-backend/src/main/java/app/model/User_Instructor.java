package app.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

@Entity
public class User_Instructor extends User {
	
	@OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.ALL})
	private List<DayStudent> classes;
	
	public User_Instructor() {
		super();
		this.classes = new ArrayList<DayStudent>();
		this.setRole("INSTRUCTOR");

	}

	public User_Instructor(String user, String pass, String name,String email) {
		super(user, pass, name, email);
		this.classes = new ArrayList<DayStudent>();
		this.setRole("INSTRUCTOR");
	}

	public List<DayStudent> getClasses() {
		return classes;
	}

	public void setClasses(List<DayStudent> classes) {
		this.classes = classes;
	}
	
	

}
