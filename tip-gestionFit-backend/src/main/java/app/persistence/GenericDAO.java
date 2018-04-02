package app.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class GenericDAO<T> {

	private Class<T> entityType;
	protected static final SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();

	@Autowired
	public GenericDAO() {
	}
	
	public GenericDAO(Class<T> entityType) {
		this.entityType = entityType;
	}

	public long save(T object) {
		Session session = sessionFactory.openSession();
		Long lastId = null;
		try {
			session.beginTransaction();
			lastId =(Long)session.save(object);
			session.getTransaction().commit();
			System.out.println(lastId +"ACA ESTA LA IDDDDDD");
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
		return lastId;

	}

	public void update(T object) {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			session.update(object);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
	}
	
	public void delete(T object) {
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			session.delete(object);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			session.getTransaction().rollback();
			throw new RuntimeException(e);
		} finally {
			session.close();
		}
	}

	@SuppressWarnings("unchecked")
	public T getById(Long id) {
		Session session = sessionFactory.openSession();
		@SuppressWarnings("deprecation")
		Criteria criteria = session.createCriteria(entityType);
		Criterion criterion = Restrictions.eq("id", id);

	    return (T) criteria.add(criterion).uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<T> getAll() {
		
		Session session = sessionFactory.openSession();
		@SuppressWarnings("deprecation")
		Criteria criteria = session.createCriteria(entityType);
		criteria.setMaxResults(50);
		List<T> result = (List<T>) criteria.list();
		return result;
	}
}
