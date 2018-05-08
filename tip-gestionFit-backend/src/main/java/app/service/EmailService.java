package app.service;
import java.io.File;

import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.file.FileDataBodyPart;
import org.springframework.stereotype.Service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;
import com.sun.jersey.core.util.MultivaluedMapImpl;

import app.model.User;
import app.model.User_Instructor;
import app.model.User_Student;

public class EmailService {
	
	/* no funca
	public static ClientResponse SendInlineImage() {
		   Client client = Client.create();
		   client.addFilter(new HTTPBasicAuthFilter("api",
		                   "key-3ac6e9afd20b3f9c12c7fbb087453ea9"));
		   WebResource webResource =
		           client.resource("https://api.mailgun.net/v3/sandbox7b8b2acb769040948e75234177fe8e75.mailgun.org" +
		                           "/messages");
		   FormDataMultiPart form = new FormDataMultiPart();
		   form.field("from", "mailgun@" + "sandbox7b8b2acb769040948e75234177fe8e75.mailgun.org" + ">");
		   form.field("to", "baz@example.com");
		   form.field("subject", "Hello");
		   form.field("text", "Testing some Mailgun awesomness!");
		   //form.field("html", "<html>Inline image here: <img src=\"cid:test.jpg\"></html>");
		   File jpgFile = new File("/home/matias/Escritorio/diamond_1-1024x768.png");
		   form.bodyPart(new FileDataBodyPart("inline",jpgFile,
		                   MediaType.APPLICATION_OCTET_STREAM_TYPE));
		   return webResource.type(MediaType.MULTIPART_FORM_DATA_TYPE).
		           post(ClientResponse.class, form);
		} */
	
	
	
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
	
	public static JsonNode sendComplexMessage(User user, String text) throws UnirestException {
		
        HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + "sandbox7b8b2acb769040948e75234177fe8e75.mailgun.org" + "/messages")
                .basicAuth("api", "key-3ac6e9afd20b3f9c12c7fbb087453ea9")
                .queryString("from", "Mailgun User <gestionfitinfo@gmail.com>")
                .queryString("to", user.getMail())
                .queryString("subject", "Hello")
                .queryString("text", "Testing out some Mailgun awesomeness!")
                .queryString("html", buildHtml(user, text))
                .asJson();

        return request.getBody();
    }
	
	public ClientResponse sendSimpleMessage() {
		  Client client = Client.create();
		  client.addFilter(new HTTPBasicAuthFilter("api", "key-3ac6e9afd20b3f9c12c7fbb087453ea9"));
		  WebResource webResource = client.resource("https://api.mailgun.net/v3/" + "sandbox7b8b2acb769040948e75234177fe8e75.mailgun.org"
		      + "/messages");
		  MultivaluedMapImpl formData = new MultivaluedMapImpl();
		  formData.add("from", "Mailgun User <mailgun@" + "sandbox7b8b2acb769040948e75234177fe8e75.mailgun.org" + ">");
		  formData.add("to", "matiascavallin96@gmail.com");
		  formData.add("subject", "Simple Mailgun Example");
		  formData.add("text", "Plaintext content");
		  return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).post(ClientResponse.class,
		      formData);
		} 

}
