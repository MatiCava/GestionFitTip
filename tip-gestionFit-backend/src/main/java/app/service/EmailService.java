package app.service;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.file.FileDataBodyPart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.internet.MimeMessage;

import app.model.User;

@Component
@Service
public class EmailService {
	
	@Autowired
	JavaMailSender sender ;
	
	
	public void sendEmailToUser(User user,String matter,String text)throws Exception {
        MimeMessage msg = sender.createMimeMessage();
        MimeMessageHelper msgHelper = new MimeMessageHelper(msg,true); 
        msgHelper.setTo("matiascavallin96@gmail.com"); //user.getMail()
        msgHelper.setText(buildHtml(user, text),true);
        msgHelper.setSubject(matter);
        sender.send(msg);
   }

	
	
	
	public static String buildHtml(User user, String text){
		
		String html ="<html>"
			+ "	   		<div class='container' padding-top: 30px'> "
			+ "				<img src='/assets/icon.png' width='40' height='35' style='display: block; margin-left: auto; margin-right: auto'> "
			+ "				<br> "
			+ "				<h1 style='text-align: center; font-family: Poppins, sans-serif; font-size:14x'> " + "Buenas " + user.getNameAndSurname() + "</h1> "
			+ "				<h1 style='text-align: left; font-family: Poppins, sans-serif; font-size:12px'> " + text + "</h1> "
			+ "			</div>  "
			+ "		  </html>";
		
		return html;
		
	}
	

	


}
