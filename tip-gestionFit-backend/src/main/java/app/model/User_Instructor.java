package app.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

@Entity
public class User_Instructor extends User {
	
	@OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.ALL})
	private Set<DayStudent> classes;
	
	public User_Instructor() {
		super();
		this.classes = new HashSet<DayStudent>();
		this.setRole("INSTRUCTOR");

	}

	public User_Instructor(String user, String pass, String name,String email) {
		super(user, pass, name, email);
		this.classes = new HashSet<DayStudent>();
		this.setRole("INSTRUCTOR");
	}

	public Set<DayStudent> getClasses() {
		return classes;
	}

	public void setClasses(Set<DayStudent> classes) {
		this.classes = classes;
	}
	
	

}
