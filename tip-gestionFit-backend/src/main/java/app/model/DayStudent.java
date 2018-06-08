package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DayStudent {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;

	private String day;
	private String startHour;
	private String endHour;
	
	public DayStudent(){
		
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getStartHour() {
		return startHour;
	}

	public void setStartHour(String start) {
		this.startHour = start;
	}

	public String getEndHour() {
		return endHour;
	}

	public void setEndHour(String end) {
		this.endHour = end;
	}
	
	
	
	
}
