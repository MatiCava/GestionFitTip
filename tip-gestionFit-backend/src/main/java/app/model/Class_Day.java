package app.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Class_Day {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate day;
	@OneToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	private Set<Class_Student> student_classes = new HashSet<Class_Student>();
	
	public Class_Day(){
		
	}
	
	public Class_Day(LocalDate date){
		this.day = date;
	}
	
	public Class_Day(LocalDate date,Set<Class_Student> classes){
		this.day = date;
		this.student_classes = classes;
	}

	public LocalDate getDay() {
		return day;
	}

	public void setDay(LocalDate day) {
		this.day = day;
	}

	public Set<Class_Student> getStudent_classes() {
		return student_classes;
	}

	public void setStudent_classes(Set<Class_Student> student_classes) {
		this.student_classes = student_classes;
	}

	public void add(Class_Student classS) {
		this.student_classes.add(classS);
		
	}

	public Class_Student get(int i) {
		
		return (Class_Student) this.student_classes.toArray()[i];
	}
	
	

}
