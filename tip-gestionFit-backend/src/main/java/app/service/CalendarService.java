package app.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.model.Class_Calendar;
import app.model.Class_Day;
import app.model.DayStudent;
import app.model.User;
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
	public Class_Calendar get(){
		Class_Calendar calendar = this.calendarDAO.getById((long) 1);
		if(LocalDate.now().minusDays(15).isAfter(calendar.firstClass())){
			calendar.clearCalendar();
			this.update(calendar);
		}

		return calendar;
	}

	@Transactional
	public void addDays(List<DayStudent> days,String name) {
		Class_Calendar calendar = this.getById((long) 1);
		LocalDate startDate = LocalDate.now();
	    long numOfDaysBetween = ChronoUnit.DAYS.between(startDate, startDate.plusMonths(1));
	    int agregados=0;
		for(DayStudent day : days){
		    for(int i = 0 ; i < numOfDaysBetween ;i++){
		    	if(startDate.plusDays(i).getDayOfWeek().name().equals(day.getDay()) ){
		    			calendar.addClass(new Class_Day(startDate.plusDays(i),day.getStartHour(),day.getEndHour(),name));
		    			agregados ++;

		    	}
		    }
		}
		
		System.out.println("Cantidad agregados " + agregados);
		this.update(calendar);



		
	}

	public List<Class_Day> getClasses(User user) {
		Class_Calendar calendar =  this.get();
		List<Class_Day> classes =  calendar.getClasses();
		List<Class_Day> classesUser = classes.stream().filter(day -> day.getStudentName().contains(user.getNameAndSurname())).collect(Collectors.toList());
		return classesUser;
	}

}
