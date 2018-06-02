package app.model;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonFormat;

import app.exception.ExpiredLessonsException;
import app.exception.InsufficientLessonsException;

@Entity
public class User_Student extends User {
	
    @Lob
    @Column( length = 100000 )
	private String photo;
	private String pathologies;
	private String observations;
	private String objective;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthday;
	private String telephone;
	private int age;
	private float weigth;
	@OneToOne(fetch=FetchType.EAGER,cascade = {CascadeType.ALL})
	private MeasuringTable measurements;
	@OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.ALL})
	@Fetch(value = FetchMode.SUBSELECT)
	private Set<Routine> routines;
	private int remainingLessons;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date paymentDate;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date lessonsExpires;
	

	public User_Student() {
		super();
		this.measurements = new MeasuringTable();
		this.routines = new HashSet<Routine>();
		this.setRole("STUDENT");


	}

	
	public User_Student(String photoProfile,String user, String pass, String name,String email,String pat,
			String obs,String obj,Date birth,String tel,
			float wS) {
		super(user,pass,name,email);
		this.photo=photoProfile;
		this.birthday = birth;
		
        Calendar birthCal = GregorianCalendar.getInstance();

        birthCal.setTime(birth);
		
		this.age = (GregorianCalendar.getInstance().get(Calendar.YEAR) - birthCal.get(Calendar.YEAR));
		this.measurements = new MeasuringTable();
		this.objective = obj;
		this.observations = obs;
		this.pathologies = pat;
		this.routines = new HashSet<Routine>();
		this.telephone = tel;
		this.weigth = wS;
		this.setRole("STUDENT");
	}


	public void addRoutine(List<Routine> routines) {
		this.routines.addAll(routines);
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




	public Set<Routine> getRoutines() {
		return routines;
	}




	public void setRutines(Set<Routine> routines) {
		this.routines = routines;
	}
	
	
	public void addMeasurements(List<Measurement> measurements) {
		this.measurements.addNewMeasurement(measurements);
	}


	public String getPhoto() {
		return photo;
	}


	public void setPhoto(String photo) {
		this.photo = photo;
	}


	public int getRemainingLessons() {
		return remainingLessons;
	}


	public void setRemainingLessons(int remainingLessons) {
		this.remainingLessons = remainingLessons;
	}
	
	public void substractRemainingLessons() throws InsufficientLessonsException,ExpiredLessonsException{
		if(this.remainingLessons > 0){
			if(this.getLessonsExpires().compareTo(new Date()) <0) {
				throw new ExpiredLessonsException();
			}
			this.remainingLessons = this.remainingLessons - 1;
		}else{
			throw new InsufficientLessonsException();
		}
	}


	public Date getPaymentDate() {
		return paymentDate;
	}


	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}


	public Date getLessonsExpires() {
		return lessonsExpires;
	}


	public void setLessonsExpires(Date lessonsExpires) {
		this.lessonsExpires = lessonsExpires;
	}
	
	
	
	

}
