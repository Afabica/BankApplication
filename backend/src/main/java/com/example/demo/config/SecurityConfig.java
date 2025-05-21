package com.example.demo.config;

import com.example.demo.jwtsecurity.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired private UserDetailsService userDetailsService;

    @Autowired private JwtUtils jwtUtils;

    @Autowired
    private CorsConfigurationSource
            corsConfigurationSource; // Inject the CorsConfigurationSource bean

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
                .cors(
                        cors ->
                                cors.configurationSource(
                                        corsConfigurationSource)) // Use CORS configuration from
                // CorsConfig
                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS)) // Stateless API
                .authorizeRequests(
                        request ->
                                request
                                        //                .requestMatchers("/api/login",
                                        // "/api/register", "/api/otp/send",
                                        // "/operations/process").permitAll() // Public APIs
                                        .requestMatchers(
                                                "/api/login", "/api/register", "/api/otp/send")
                                        .permitAll()
                                        .requestMatchers("/api/home", "/api/users")
                                        .permitAll() // Allow public access
                                        .anyRequest()
                                        .authenticated() // Require authentication for other
                        // endpoints
                        )
                .requiresChannel(channel -> channel.anyRequest().requiresSecure()) // Enforce HTTPS
                .addFilterBefore(
                        new JwtAuthenticationFilter(jwtUtils),
                        UsernamePasswordAuthenticationFilter.class) // Add JWT filter
                .logout(
                        logout ->
                                logout.logoutUrl("/api/logout")
                                        .deleteCookies("JSESSIONID")
                                        .permitAll());

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}
