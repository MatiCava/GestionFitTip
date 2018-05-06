package app.config;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

import app.model.User;
import app.persistence.UserDAO;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {
	  @Autowired
	  private UserDAO userDAO = new UserDAO();

    public LoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException, ServletException {
    	System.out.println("#####################LLEGOOOOO##########################");
        // obtenemos el body de la peticion que viene en formato JSON
    	InputStream body = req.getInputStream();   	

        // mapeamos con la clase Credentials para tener ahi los datos
        Credentials user = new ObjectMapper().readValue(body, Credentials.class);

        // finalmente autenticamos
        // spring compara el username/password recibidos
        // contra el que definimos en la clase SecurityConfig
        System.out.println(user.getEmail());
        System.out.println(user.getPassword());

        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest req,
            HttpServletResponse res, FilterChain chain,
            Authentication auth) throws IOException, ServletException {
    	System.out.println("EXITOOO");
        // si la autenticacion fue exitosa  agregamos el token a la respuesta
    	User user = userDAO.getByUsername(auth.getName());
        JwtUtil.addAuthentication(res, auth.getName(),user.id);
    }
}
