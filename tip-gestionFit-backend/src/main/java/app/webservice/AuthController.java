package app.webservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController {
	
	
	@GetMapping("/authenticate")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void auth() {
		//Este metodo sirve solo para validar el token y autorizar o no al cliente

	}
}
