package app.exception;

import javax.servlet.ServletException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class NoAuthorizationException extends ServletException {

	private static final long serialVersionUID = 1L;
	
	public NoAuthorizationException(String message){
		super(message);
	}
}
