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
	private int startHour;
	private int endHour;
	@OneToMany(cascade= CascadeType.ALL,fetch=FetchType.EAGER)
	private Set<StudentAssist> students;

	
	public Class_Day(){
		this.students= new HashSet<StudentAssist>();		
	}
	
	public Class_Day(LocalDate date){
		this.day = date;
		this.students= new HashSet<StudentAssist>();

	}
	
	public Class_Day(LocalDate date,int start,int end) {
		this.day = date;
		this.startHour = start;
		this.endHour = end;
		this.students= new HashSet<StudentAssist>();
	}
	
	public Class_Day(LocalDate date,int start,int end, String name, long id) {
		this.day = date;
		this.startHour = start;
		this.endHour = end;
		this.students= new HashSet<StudentAssist>();
		this.students.add(new StudentAssist(name,id));
	}
	

	public LocalDate getDay() {
		return day;
	}

	public void setDay(LocalDate day) {
		this.day = day;
	}

	public int getStartHour() {
		return startHour;
	}

	public void setStartHour(int startHour) {
		this.startHour = startHour;
	}

	public int getEndHour() {
		return endHour;
	}

	public void setEndHour(int endHour) {
		this.endHour = endHour;
	}

	public Set<StudentAssist> getStudents() {
		return students;
	}

	public void setStudents(Set<StudentAssist> students) {
		this.students = students;
	}

	public boolean hasStudent(Long id) {
		for(StudentAssist stu : this.students) {
			if(stu.getStudentId() == id) {
				return true;
			}
		}
		return false;
	}

	public void addStudent(String name, long id) {
		this.students.add(new StudentAssist(name,id));
		
	}

	public void assisted(Long id) {
		for(StudentAssist stu : this.students) {
			if(stu.getStudentId() ==id) {
				stu.setAssisted(true);
			}
		}
		
	}


	
	

//	public Set<Class_Student> getStudent_classes() {
//		return student_classes;
//	}
//
//	public void setStudent_classes(Set<Class_Student> student_classes) {
//		this.student_classes = student_classes;
//	}
//
//	public void add(Class_Student classS) {
//		this.student_classes.add(classS);
//		
//	}
//
//	public Class_Student get(int i) {
//		
//		return (Class_Student) this.student_classes.toArray()[i];
//	}
	
	

}
