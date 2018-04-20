package model;

import java.util.GregorianCalendar;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import app.model.User_Student;
import app.service.ArgumentsValidator;

public class ValidatorTestCase {
	
	User_Student student;
	
	@Before
	public void setUp() throws Exception {
		this.student = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","student","1234","Alumno",
				"alumno@gmail.com","Tendinitis mano derecha","Buena flexibilidad","Ganar masa muscular",new GregorianCalendar(1990,01,01).getTime()
				,"42568978",80f);
	}

	@After
	public void tearDown() throws Exception {
		this.student = new User_Student("https://pbs.twimg.com/profile_images/1724449330/stick_man_by_minimoko94-d2zvfn8_400x400.png","student","1234","Alumno",
				"alumno@gmail.com","Tendinitis mano derecha","Buena flexibilidad"
				,"Ganar masa muscular",new GregorianCalendar(1990,01,01).getTime()
				,"42568978",80f);
	}

	@Test(expected = IllegalArgumentException.class)
	public void ifAnStudentIsCreatedWithInvalidBirthdate_ItShouldThrowAnException() { 
		this.student.setBirthday(new GregorianCalendar(1800,01,01).getTime());
		ArgumentsValidator.validateStudent(this.student);
	}
	
	@Test(expected = IllegalArgumentException.class)
	public void ifAnStudentIsCreatedWithInvalidMail_ItShouldThrowAnException() {
		this.student.setMail("fulanogmailcom");

		ArgumentsValidator.validateStudent(student);
	}
	@Test(expected = IllegalArgumentException.class)
	public void ifAnStudentIsCreatedWithInvalidName_ItShouldThrowAnException() {
		this.student.setNameAndSurname(null);

		ArgumentsValidator.validateStudent(student);
	}
	@Test(expected = IllegalArgumentException.class)
	public void ifAnStudentIsCreatedWithInvalidPhoneNumber_ItShouldThrowAnException() {
		this.student.setTelephone("123");

		ArgumentsValidator.validateStudent(student);
	}
	@Test(expected = IllegalArgumentException.class)
	public void ifAnStudentIsCreatedWithInvalidWeigth_ItShouldThrowAnException() {
		this.student.setWeigth(-20f);

		ArgumentsValidator.validateStudent(student);
	}
	
	
	

}
