package model;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Exercise {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long id;
	@Enumerated
	public Exercise_Type type;
	public String name;
	public String description;
	
	public Exercise() {
		
	}
	
	public Exercise(String nom,String desc,Exercise_Type typeE) {
		this.type = typeE;
		this.name = nom;
		this.description = desc;
	}

}
