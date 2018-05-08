package app.service;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import app.model.User;

@Component
@Service
public class EmailService {
	
	public static String WELCOME = "¡Bienvenido a GestionFit!";
	public static String ROUTINE = "Nueva rutina asignada";
	

	
	@Autowired
	JavaMailSender sender ;
	
	
	public void sendEmailToUser(User user,String matter)throws Exception {
		String text = "";
		switch(matter){
			case "¡Bienvenido a GestionFit!" : text = this.welcomeMessage(user);
			case "Nueva rutina asignada": text = this.newRoutineAssignedMessage(user);
		}
        MimeMessage msg = sender.createMimeMessage();
        MimeMessageHelper msgHelper = new MimeMessageHelper(msg,true); 
        msgHelper.setTo(user.getMail());
        msgHelper.setText(buildHtml(text),true);
        msgHelper.setSubject(matter);
        sender.send(msg);
   }

	
	
	
	public static String buildHtml(String text){
		
		String html =
				
				"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"
		 +		"<html xmlns='http://www.w3.org/1999/xhtml'>"
		 +    	"<head>"
		 +			"<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />"
		 +			"<meta name='viewport' content='width=device-width, initial-scale=1.0'/>"
		 +			"<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>"
		 +		"</head>"
		 +		"<body>"
		 + "	   		<div padding-top: 20px'> "
		 + "				<table align='center' border='1' cellpadding='0' cellspacing='0' width='600'>"
		 +"						<tr>"
		 +"						<td bgcolor='#59b6f8'>"
		 +"							<img src='https://image.ibb.co/gnMBDn/GFEmail.jpg' alt='GFEmail' width='100%' height='230' style='display: block;'>"
		 +"						</td>"
		 +"						</tr>"
		 +"						<tr>"
		 +"						<td bgcolor='#ffffff'>"
		 +							"<div>"
		 + 								text	
		 +"							 </div>"
		 +"						</td>"
		 +"						</tr>"
		 +"						<tr>"
		 +"						<td bgcolor='#ee4c50'>"
		 +""
		 +"						</td>"
		 +"						</tr>"
		 +"					</table>"
		 + "				<br> "
		 + "			</div>  "
		 + "	 </body>"
		 +		"</html>";
				
				
				

		
		return html;
		
	}
	
	
	private String welcomeMessage(User user){
		String WELCOME_MESSAGE = "							<h1 style='text-align: center; font-family: Poppins, sans-serif; font-size:14x'> " + "Bienvenido a GestionFit " + user.getNameAndSurname() + "</h1> "
				 + "							<h1 style='text-align: left; font-family: Poppins, sans-serif; font-size:12px'> Ya puedes ingresar a tu cuenta desde la app. Tu usuario es: " + user.getUsername() + "</h1>";
		return WELCOME_MESSAGE;
	}
	
	private String newRoutineAssignedMessage(User user){
		String ROUTINE_MESSAGE = "							<h1 style='text-align: center; font-family: Poppins, sans-serif; font-size:14x'> " + user.getNameAndSurname() + "</h1> "
				 + "							<h1 style='text-align: left; font-family: Poppins, sans-serif; font-size:12px'> Se te asigno una nueva rutina. Ingresa en la app para visualizarla. </h1>";
		return ROUTINE_MESSAGE;
	}
	

	


}
