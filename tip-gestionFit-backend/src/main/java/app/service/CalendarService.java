package app.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Class_Calendar;
import app.model.Class_Student;
import app.model.DayStudent;
import app.persistence.CalendarDAO;

@Service
public class CalendarService {
	
	@Autowired
	private CalendarDAO calendarDAO;
	
	public CalendarService(){
		this.calendarDAO = new CalendarDAO();
	}
	
	@Transactional
	public void save(Class_Calendar newExercise){
		this.calendarDAO.save(newExercise);
	}
	
	@Transactional
	public void update(Class_Calendar newExercise){
		this.calendarDAO.update(newExercise);
	}
	
	@Transactional
	public void delete(Class_Calendar exercise){
		this.calendarDAO.delete(exercise);
	}
	
	@Transactional
	public Class_Calendar getById(Long id){
		return this.calendarDAO.getById(id);
	}
	
	@Transactional
	public List<Class_Calendar> getAll(){
		return this.calendarDAO.getAll();
	}

	@Transactional
	public void addDays(List<DayStudent> days,String name) {
		Class_Calendar calendar = this.getAll().get(0);
		for(DayStudent day : days){
			LocalDate startDate = LocalDate.now();
		    long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, startDate.plusMonths(1));
		    for(int i = 0 ; i < numOfDaysBetween;i++){
		    	LocalDate actual = startDate.plusDays(i);
		    	System.out.println(actual.getDayOfWeek().name());
		    	if(actual.getDayOfWeek().name().equals(day.getDay()) ){
		    		calendar.addClass(actual, new Class_Student(day.getStartHour(),day.getEndHour(),name));
		    	}
		    }
		}
		this.update(calendar);



		
	}

}
