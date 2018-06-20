package service;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import app.model.Class_Calendar;
import app.model.Class_Day;
import app.model.DayStudent;
import app.model.User_Student;
import app.service.CalendarService;
import app.service.UserService;

public class UserServiceTestCase {
	
	SessionFactory sessionFactory ;
	Session session;
	UserService userServ = new UserService();
	CalendarService calServ = new CalendarService();

	@Before
	public void setUp() throws Exception {
		if(sessionFactory ==null) {
			Configuration cfg = new Configuration().configure();
		
		
		Map<String,String> jdbcUrlSettings = new HashMap<>();
		String jdbcDbUrl = System.getenv("JDBC_DATABASE_URL");
		if (null != jdbcDbUrl) {
		  jdbcUrlSettings.put("hibernate.connection.url", System.getenv("JDBC_DATABASE_URL"));
		  jdbcUrlSettings.put("hibernate.connection.username", System.getenv("JDBC_DATABASE_USERNAME"));
		  jdbcUrlSettings.put("hibernate.connection.password", System.getenv("JDBC_DATABASE_PASSWORD"));
		}


		StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure("hibernate.cfg.xml").applySettings(jdbcUrlSettings).
		    build();
		sessionFactory=cfg.buildSessionFactory(registry);
		session = sessionFactory.openSession();

		}
	}

	@After
	public void tearDown() throws Exception {
		session.close();
		sessionFactory.close();
	}

	@Test
	public void ifAllUsersAreRequestedAfterSavingAValidStudent_itShouldBeAListOfSize1() {
		User_Student student = new User_Student("foto.png","instructor1", "1234", "Fernando Fernandez", "ff@gmail.com",
				"Tendinitis","","Bajar de peso", new GregorianCalendar(1990,01,01).getTime(),"43568793",
				80.2f);
		this.userServ.saveStudent(student);
		assertEquals(this.userServ.getAll().size(),1);
	}
	
	@Test
	public void ifAllUsersAreRequestedAfterSavingAValidStudentAndDeletingIt_itShouldBeAListOfSize0() {
		User_Student student = new User_Student("foto.png","instructor1", "1234", "Fernando Fernandez", "ff@gmail.com",
				"Tendinitis","","Bajar de peso", new GregorianCalendar(1990,01,01).getTime(),"43568793",
				80.2f);
		this.userServ.saveStudent(student);
		this.userServ.delete(student);
		assertEquals(this.userServ.getAll().size(),0);
	}
	
	@Test
	public void ifAValidUserIsSavedAndRequested_itShouldBeTheSame() {
		User_Student student = new User_Student("foto.png","instructor1", "1234", "Fernando Fernandez", "ff@gmail.com",
				"Tendinitis","","Bajar de peso", new GregorianCalendar(1990,01,01).getTime(),"43568793",
				80.2f);
		this.userServ.saveStudent(student);
		assertEquals(this.userServ.getById(student.id).getUsername(),student.getUsername());
		assertEquals(this.userServ.getById(student.id).getPassword(),student.getPassword());
		

	}
	
	@Test
	public void ifAValidUserIsSavedUpdatedAndRequested_itShouldChangeInDB() {
		User_Student student = new User_Student("foto.png","instructor1", "1234", "Fernando Fernandez", "ff@gmail.com",
				"Tendinitis","","Bajar de peso", new GregorianCalendar(1990,01,01).getTime(),"43568793",
				80.2f);
		this.userServ.saveStudent(student);
		student.setMail("fernandoF@gmail.com");
		this.userServ.updateStudent(student);
		assertEquals(this.userServ.getById(student.id).getUsername(),student.getUsername());
		assertEquals(this.userServ.getById(student.id).getMail(),"fernandoF@gmail.com");
		

	}
	
	
	
	

}
