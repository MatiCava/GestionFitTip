package model;

import java.util.Date;

public class Measurement {

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
