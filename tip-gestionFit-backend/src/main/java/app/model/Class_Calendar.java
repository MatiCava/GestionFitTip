package app.model;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
//		this.initializeCalendar();
		
	}
	
	public void clearCalendar(){
		
//	    long numOfDaysBetween = ChronoUnit.DAYS.between(this.classes.get(0).getDay(), this.classes.get(0).getDay().plusMonths(1)); 
//	    for(int i =0; i < numOfDaysBetween;i++){
//	    	this.classes.remove(i);
//	    }
//	    
//	    LocalDate lastDay = this.classes.get(this.classes.size()-1).getDay();
//	    long numOfDaysBetween2 = ChronoUnit.DAYS.between(lastDay, this.classes.get(0).getDay().plusMonths(1)); 
//	    List<LocalDate> dates = new ArrayList<LocalDate>();
//	    for(int i =1; i < numOfDaysBetween2;i++){
//	    	dates.add(lastDay.plusDays(i));
//	    }
//
//	    
//	    for(LocalDate date : dates){
//	    	this.classes.add(new Class_Day(date));
//	    }

		
	}
	
//	public void initializeCalendar(){
//		LocalDate startDate = LocalDate.now();
//	    long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, startDate.plusMonths(1).plusDays(20)); 
//	    
//	    List<LocalDate> dates = new ArrayList<LocalDate>();
//	    for(int i =0; i < numOfDaysBetween;i++){
//	    	dates.add(startDate.plusDays(i));
//	    }
//
//	    
//	    for(LocalDate date : dates){
//	    	this.classes.add(new Class_Day(date));
//	    }
//	}
	
	public void addClass(Class_Day classD){
		for(Class_Day cd : this.classes) {
			if(cd.getDay().isEqual(classD.getDay()) 
			  && cd.getStartHour().equals(classD.getStartHour()) 
			  && !cd.getStudentName().contains(classD.getStudentName())) {
				cd.setStudentName(cd.getStudentName() + " , " + classD.getStudentName());
				break;
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
