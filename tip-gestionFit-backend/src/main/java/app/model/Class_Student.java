package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Class_Student {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;

	private String startHour;
	private String endHour;
	private String studentName;
	
	public Class_Student(){
		
	}
	
	public Class_Student(String starH, String endH, String name){
		this.startHour = starH;
		this.endHour = endH;
		this.studentName = name;
	}



	public String getStartHour() {
		return startHour;
	}

	public void setStartHour(String startHour) {
		this.startHour = startHour;
	}

	public String getEndHour() {
		return endHour;
	}

	public void setEndHour(String endHour) {
		this.endHour = endHour;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	
	
	
	

}
