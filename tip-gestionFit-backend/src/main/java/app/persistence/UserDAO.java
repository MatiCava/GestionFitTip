package app.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import app.model.User;
import app.model.User_Student;

@Repository
public class UserDAO extends GenericDAO<User> {

	public UserDAO() {
		super(User.class);
	}
	
	
	@SuppressWarnings({ "unchecked", "deprecation" })
	public List<User_Student> getAllUserRole(Object objt){
		Session session = sessionFactory.openSession();
		Criteria criteria = session.createCriteria(User.class);
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		Criterion criterion = Restrictions.and(Restrictions.ge("id", 0L),Restrictions.eq("role", objt));
		List<User_Student> result = (List<User_Student>) criteria.add(criterion).list();
		return result;
	}
	
	@SuppressWarnings("deprecation")
	public User getByUsername(String username) {
		Session session = sessionFactory.openSession();
		Criteria criteria = session.createCriteria(User.class);
		Criterion criterion = Restrictions.eq("username", username);
		return (User) criteria.add(criterion).uniqueResult();
	}
}
