package app.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import app.model.MeasuringTable;
import app.model.User;
import app.model.User_Role;
import app.model.User_Student;

@Repository
public class UserDAO extends GenericDAO<User> {

	public UserDAO() {
		super(User.class);
	}
	
	
	@SuppressWarnings({ "unchecked", "deprecation" })
	public List<User_Student> getAllUserRole(Object objt){
		List<User_Student> result = null;
		Session session = sessionFactory.openSession();
		try {
			Criteria criteria = session.createCriteria(User.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			Criterion criterion = Restrictions.and(Restrictions.ge("id", 0L),Restrictions.eq("role", objt));
			result = (List<User_Student>) criteria.add(criterion).list();
		}
		catch(Exception e) {
			throw new RuntimeException(e);
		}
		finally {
			if(session != null) {
				session.close();
			}
		}
		return result;
	}
	
	@SuppressWarnings("deprecation")
	public User getByUsername(String username) {
		User result = null;
		Session session = sessionFactory.openSession();
		try {
		Criteria criteria = session.createCriteria(User.class);
		Criterion criterion = Restrictions.eq("username", username);
		result = (User) criteria.add(criterion).uniqueResult();
		}
		catch(Exception e) {
			throw new RuntimeException(e);
		}
		finally {
			if(session != null) {
				session.close();
			}
		}
		return result;
	}

	@SuppressWarnings("deprecation")
	public User_Student getStudent(Long idUser) {
		User_Student result = null;
		Session session = sessionFactory.openSession();
		try {
			Criteria criteria = session.createCriteria(User.class);
			Criterion criterion = Restrictions.and(Restrictions.eq("role", User_Role.Student),Restrictions.eq("id",idUser));
			result = (User_Student) criteria.add(criterion).uniqueResult();
		}catch(Exception e) {
			throw new RuntimeException(e);
		}
		finally {
			if(session != null) {
				session.close();
			}
		}
		return result;
	}
}
