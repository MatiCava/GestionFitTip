package app.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class User_Student extends User {
	
	private String pathologies;
	private String observations;
	private String objective;
	private Date birthday;
	private String telephone;
	private int age;
	private float weigth;
	@OneToOne(cascade = {CascadeType.ALL})
	private MeasuringTable measurements;
	@ManyToMany(cascade = {CascadeType.ALL})
	private List<Routine> routines;
	

	public User_Student() {
		super();
	}

	
	public User_Student(String user, String pass, String name,String email,String pat,
			String obs,String obj,Date birth,String tel,int ageS,
			float wS) {
		super(user,pass,name,email);
		this.age = ageS;
		this.birthday = birth;
		this.measurements = new MeasuringTable();
		this.objective = obj;
		this.observations = obs;
		this.pathologies = pat;
		this.routines = new ArrayList<Routine>();
		this.telephone = tel;
		this.weigth = wS;
		this.setRole(User_Role.Student);
	}


	public void addRoutine(Routine routine) {
		this.routines.add(routine);
	}


	public String getPathologies() {
		return pathologies;
	}




	public void setPathologies(String pathologies) {
		this.pathologies = pathologies;
	}




	public String getObservations() {
		return observations;
	}




	public void setObservations(String observations) {
		this.observations = observations;
	}




	public String getObjective() {
		return objective;
	}




	public void setObjective(String objective) {
		this.objective = objective;
	}




	public Date getBirthday() {
		return birthday;
	}




	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}




	public String getTelephone() {
		return telephone;
	}




	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}


	public int getAge() {
		return age;
	}




	public void setAge(int age) {
		this.age = age;
	}




	public float getWeigth() {
		return weigth;
	}




	public void setWeigth(float weigth) {
		this.weigth = weigth;
	}




	public MeasuringTable getMeasurements() {
		return measurements;
	}




	public void setMeasurements(MeasuringTable measurements) {
		this.measurements = measurements;
	}




	public List<Routine> getRoutines() {
		return routines;
	}




	public void setRutines(List<Routine> routines) {
		this.routines = routines;
	}
	
	
	

}
