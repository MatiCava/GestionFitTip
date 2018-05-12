package app.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
   
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
        	.csrf().disable()
        	.authorizeRequests()
        	.antMatchers("/").permitAll()
        	.antMatchers("/auth/signup").permitAll()
        	.antMatchers("/api/alumnos","/api/routines","/api/exercises").hasAuthority("ROLE_INSTRUCTOR")
            .antMatchers("/favicon.ico").permitAll() 
            .antMatchers("/css/**").permitAll().antMatchers("/error").permitAll()
            .antMatchers("/bower_components/**").permitAll()
            .anyRequest().fullyAuthenticated()//cualquier otra peticion requiere autenticacion
            .and().formLogin().loginPage("/auth/login").failureUrl("/auth/login?error").permitAll().and()
            // Las peticiones /login pasan previamente por este filtro
            .addFilterBefore(new LoginFilter("/auth/login", authenticationManager()),
                    UsernamePasswordAuthenticationFilter.class)

            // Las demás peticiones pasan por este filtro para validar el token
            .addFilterBefore(new JwtFilter(),
                    UsernamePasswordAuthenticationFilter.class)
            ;
    }
    

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
}
