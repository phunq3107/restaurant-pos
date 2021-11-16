package com.example.restaurantpos.secutiry;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

/**
 * @author phunq3107
 * @since 11/16/2021
 */
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final PasswordEncoder passwordEncoder;

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http
        .authorizeRequests()
        .antMatchers("/css/**", "/js/**", "/image/**", "/vendor/**","/h2-console/**").permitAll()
        .antMatchers("/menu**", "/payment**", "/login**", "/", "/api/v1/menu/**").permitAll()
        .antMatchers("/api/v1/clerk**").hasRole("CLERK")
        .antMatchers("/clerk**").hasRole("CLERK")
        .anyRequest().authenticated()
    ;

    http
        .formLogin();

    http
        .csrf().disable()
        .headers().disable();
  }

  @Override
  @Bean
  protected UserDetailsService userDetailsService() {
    UserDetails clerk = User.builder()
        .username("clerk")
        .password(passwordEncoder.encode("123456"))
        .roles("CLERK")
        .build();
    return new InMemoryUserDetailsManager(clerk);
  }
}
