package model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Measurement {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;

	public Date day;
	public int measure;
	public int height;
	
	public Measurement(){
		
	}
	
	public Measurement(Date newDay, int newMeasure, int newHeight){
		this.day = newDay;
		this.measure = newMeasure;
		this.height = newHeight;
	}
}
