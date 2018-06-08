package app.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Class_Calendar {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;

	@javax.persistence.OneToMany(cascade = CascadeType.ALL,fetch=FetchType.EAGER)
	private List<Class_Day> classes= new ArrayList<Class_Day>();
	
	public Class_Calendar(){
		
	}
	
	public void clearCalendar(){
		
		for(Class_Day classD : this.classes){
			if(classD.getDay().isBefore(this.firstClass().plusDays(15))){
				this.classes.remove(classD);
			}
			
		}

		
	}
	

	public LocalDate firstClass(){
		LocalDate first = this.classes.get(0).getDay();
		for(Class_Day classD : this.classes){
			if(classD.getDay().isBefore(first)){
				first = classD.getDay();
			}
			
		}
		return first;
		
	}

	
	public void addClass(Class_Day classD){
		for(Class_Day cd : this.classes) {
			if(cd.getDay().isEqual(classD.getDay()) 
			  && cd.getStartHour().equals(classD.getStartHour()) 
			  && !cd.getStudentName().contains(classD.getStudentName())) {
				cd.setStudentName(cd.getStudentName() + " , " + classD.getStudentName());
				return;
			}
			
		}
		this.classes.add(classD);
	}
	
	public Class_Day getClassDay(LocalDate date){
		
		for(Class_Day classD : this.classes){
			if(classD.getDay().isEqual(date)){
				return classD;
				
			}
		}
		
		return null;
	}

	public List<Class_Day> getClasses() {
		return classes;
	}

	public void setClasses(List<Class_Day> classes) {
		this.classes = classes;
	}
	
	
}
