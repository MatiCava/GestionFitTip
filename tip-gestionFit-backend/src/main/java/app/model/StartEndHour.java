package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StartEndHour {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	
	private String startHour;
	private String endHour;
	
	public StartEndHour() {
		
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
