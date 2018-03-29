package model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Measure {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;

	public String name;
	@OneToMany(cascade= {CascadeType.ALL})
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
