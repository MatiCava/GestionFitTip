package model;

import java.util.ArrayList;
import java.util.List;

public class MeasuringTable {

	public List<Measure> measures = new ArrayList<Measure>();
	
	public MeasuringTable(){
		this.measures.add(new Measure("Chest"));
		this.measures.add(new Measure("Arm"));
		this.measures.add(new Measure("Waist"));
		this.measures.add(new Measure("Abdomen"));
		this.measures.add(new Measure("Glute"));
		this.measures.add(new Measure("Thigh"));
		this.measures.add(new Measure("Calf muscle"));
	}
	
	public void addNewMeasurement(List<Measurement> newMeasurement){
		for(int i = 0; i < this.measures.size(); i++){
			this.measures.get(i).addMeasurement(newMeasurement.get(i));
		}
	}
}
