package model;

import java.util.ArrayList;
import java.util.List;

public class Measure {

	public String name;
	public List<Measurement> measures;
	
	public Measure(){
		
	}
	
	public Measure(String newName){
		this.name = newName;
		this.measures = new ArrayList<Measurement>();
	}
	
	public void addMeasurement(Measurement newMeasurement){
		this.measures.add(newMeasurement);
	}
}
