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
//	@javax.persistence.MapKey(name = "day")
	private List<Class_Day> classes= new ArrayList<Class_Day>();
	
	public Class_Calendar(){
		this.initializeCalendar();
		
	}
	
	public void clearCalendar(){
		this.classes.clear();
	}
	
	public void initializeCalendar(){
		LocalDate startDate = LocalDate.now().minusDays(7);
	    long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, startDate.plusDays(7).plusMonths(1)); 
	    
	    List<LocalDate> dates = new ArrayList<LocalDate>();
	    for(int i =0; i < numOfDaysBetween;i++){
	    	dates.add(startDate.plusDays(i));
	    }
//	    IntStream.iterate(0, i -> i + 1).limit(numOfDaysBetween).mapToObj(i -> startDate.plusDays(i))
//	      .collect(Collectors.toList()); 
	    
	    for(LocalDate date : dates){
	    	this.classes.add(new Class_Day(date));
	    }
	}
	
	public void addClass(LocalDate day,Class_Student classS){
		for(Class_Day classD : this.classes){
			if(classD.getDay().isEqual(day)){
				classD.add(classS);
				break;
			}
		}
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
