package app.model;

public class Promo {
	
	private String matter;
	private String body;
	private String photo;
	
	public Promo(){
		
	}
	
	public Promo(String matterS, String bodyS, String photoS){
		this.matter = matterS;
		this.body = bodyS;
		this.photo = photoS;
	}

	public String getMatter() {
		return matter;
	}

	public void setMatter(String matter) {
		this.matter = matter;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	

}
