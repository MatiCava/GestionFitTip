package app.service;

import java.util.Date;

import org.apache.commons.validator.routines.EmailValidator;

import app.model.User;
import app.model.User_Student;

public class ArgumentsValidator {
	
	public static boolean isNullOrEmptyString(String... strArr) {
	    for (String st : strArr) {
	        if  (st==null || st.isEmpty())
	           return true;
	    } 
	    return false;
	}
	
	public static boolean isNegativeInt(Integer... intArr) {
	    for (Integer i : intArr) {
	        if  (i==null || i < 0)
	           return true;
	    } 
	    return false;
	}
	
	public static boolean isNotAValidMailAddress(String... strArr) {
	    if(isNullOrEmptyString(strArr))
	    	return true;
	    
		EmailValidator mailValid = EmailValidator.getInstance();
		
		for (String st : strArr) {
			
	        if  (!mailValid.isValid(st))
	           return true;
	    } 
	    return false;
	}
	
	public static boolean isInvalidFullName(String name) {
		if(isNullOrEmptyString(name) || (name.length() < 4 || name.length() > 50)) 
			return true;
		return false;
	}
	
	public static boolean isInvalidTelephone(String number) {
		if(isNullOrEmptyString(number) || number.length() == 8)
			return true;
		
		
		return false;
	}
	
	@SuppressWarnings("deprecation")
	public static boolean isInvalidDate(Date date) {
		int greater = date.compareTo(new Date(1910, 01, 01));
		int less = date.compareTo(new Date(2005,01,01));
		if(greater < 0 || less >0) 
			return true;
		return false;
	}

	public static void validateStudent(User newUser) {
		User_Student user = (User_Student) newUser;

		if(isInvalidDate(user.getBirthday()) || isInvalidFullName(user.getNameAndSurname())
				|| isInvalidTelephone(user.getTelephone()) || isNullOrEmptyString(user.getObjective())) {
			throw new IllegalArgumentException("Not a valid student");
		}
		
	}

	public static void validateInstructor(User user) {
		
	}

}
