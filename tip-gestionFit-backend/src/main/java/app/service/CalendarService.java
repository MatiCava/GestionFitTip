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
import app.model.Class_Student;
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
		if(LocalDate.now().isAfter(calendar.getClasses().get(calendar.getClasses().size()-1).getDay())){
			System.out.println("CAMBIOOO");
			calendar.clearCalendar();
			this.update(calendar);
		}
		else{
			System.out.println("NOO CAMBIOOO");

		}
//		for(Class_Day classD : calendar.getClasses()){
//			if(!classD.getStudent_classes().isEmpty()){
//				for(Class_Student classS : classD.getStudent_classes()){
//					System.out.println(classS.getStartHour() + classS.getStudentName());
//				}
//			}
//		}
		System.out.println(calendar.getClasses().size());
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
//		    		}
//		    		else{
//		    		for(Class_Student classS : calendar.getClassDay(startDate.plusDays(i)).getStudent_classes()){
//		    			if(classS.getStartHour().equals(day.getStartHour())){
//		    				System.out.println("############# MISMAHORA");
//		    				if(!classS.getStudentName().contains(name)){
//			    				System.out.println("############# "+ name);
//
//			    				classS.setStudentName(classS.getStudentName() + " , " + name);
//			    				agregados++;
//		    				}
//		    			}
//		    			else{
//		    				System.out.println("************* MISMAHORA");
//		    				agregados++;
//			    			calendar.addClass(startDate.plusDays(i), new Class_Student(day.getStartHour(),day.getEndHour(),name));
//		    			}
//		    		}
//		    		}
		    	}
		    }
		}
		
		System.out.println("Cantidad agregados " + agregados);
		this.update(calendar);



		
	}

	public List<Class_Day> getClasses(User user) {
		Class_Calendar calendar =  this.get();
		List<Class_Day> classes =  calendar.getClasses();
		List<Class_Day> classesUser = classes.stream().filter(day -> day.getStudentName() == user.getNameAndSurname()).collect(Collectors.toList());
		return classesUser;
	}

}
