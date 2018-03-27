package model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class User_Student extends User {
	
	private String pathologies;
	private String observations;
	private String objective;
	private Date birthday;
	private String telephone;
	private String mail;
	private int age;
	private float weigth;
	private MeasuringTable measurements;
	private List<Routine> rutines;
	


	
	public User_Student(String user, String pass, String name,String pat,
			String obs,String obj,Date birth,String tel,String email,int ageS,
			float wS) {
		super(user,pass,name);
		this.age = ageS;
		this.birthday = birth;
		this.mail = email;
		this.measurements = new MeasuringTable();
		this.objective = obj;
		this.observations = obs;
		this.pathologies = pat;
		this.rutines = new ArrayList<Routine>();
		this.telephone = tel;
		this.weigth = wS;
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




	public String getMail() {
		return mail;
	}




	public void setMail(String mail) {
		this.mail = mail;
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




	public List<Routine> getRutines() {
		return rutines;
	}




	public void setRutines(List<Routine> rutines) {
		this.rutines = rutines;
	}
	
	
	

}
