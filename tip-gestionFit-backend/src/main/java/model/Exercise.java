package model;


public class Exercise {
	
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
