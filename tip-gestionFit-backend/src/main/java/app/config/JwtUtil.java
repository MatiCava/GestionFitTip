package app.config;

import static java.util.Collections.emptyList;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.util.UrlPathHelper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

    // metodo para crear el JWT y enviarlo al cliente en el header de la respuesta
    static void addAuthentication(HttpServletResponse res,String username, long id) throws IOException {

        String token = Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + 600000000))
            .signWith(SignatureAlgorithm.HS512, "I@nAci0")
            .compact();

        System.out.println(token);
      //agregamos al encabezado y al cuerpo de la respuesta el token 
        res.addHeader("Authorization", token);
    	PrintWriter writer = res.getWriter();
		writer.write("{\"token\":\""+ "Bearer " + token + "\""+ ",\"id\":\""+ id + "\""+ "}");
        writer.close();
    }

    // metodo para validar el token enviado por el cliente
    static Authentication getAuthentication(HttpServletRequest request) {

        // obtenemos el token que viene en el encabezado de la peticion
    	System.out.println(request.getHeader("Authorization"));
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        System.out.println("TOKEEEEN");
        System.out.print(token);


        String url=request.getRequestURL().toString();

        try{
        	// si hay un token presente entonces lo validamos
	        if (token != null) {
	            String user = Jwts.parser()
	                    .setSigningKey("I@nAci0")
	                    .parseClaimsJws(token) //este metodo es el que valida
	                    .getBody()
	                    .getSubject();
	            System.out.println(user);
	            if(url.contains("user/byUsername")) {
	            	if(!url.contains(user)) {
	            		throw new ExpiredJwtException(null, null, user);
	            	}
	            }
	
	            return user != null ?
	                    new UsernamePasswordAuthenticationToken(user, null,  emptyList()) :
	                    null;
	        }
        } catch(ExpiredJwtException exception){
        	return null;
        }
        return null;
    }
}

