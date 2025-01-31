package com.example.demo.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.demo.model.LoginUser;
import com.example.demo.repository.LoginRepo;
import com.example.demo.jwtsecurity.JwtUtils;

import java.io.IOException;

@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtUtils jwtUtil;
//
//    @Autowired
//    private LoginRepo loginRepo;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//        final String authorizationHeader = request.getHeader("Authorization");
//
//        String username = null;
//        String jwt = null;
//
//        // Extract JWT token from header
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            jwt = authorizationHeader.substring(7);
//            username = jwtUtil.extractUsername(jwt);
//        }
//
//        // Validate the token and authenticate
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            // Load user from the repository
//            LoginUser userEntity = loginRepo.findByUsername(username)
//                    .orElse(null);
//
//            if (userEntity != null && jwtUtil.validateToken(jwt, userEntity.getUsername())) {
//                UserDetails userDetails = User.builder()
//                        .username(userEntity.getUsername())
//                        .password(userEntity.getPassword()) // Optional: Replace with a secure default
//                        //.roles(userEntity.getRole())
//                        .build();
//
//                UsernamePasswordAuthenticationToken authToken =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//                // Set authentication in context
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//            }
//        }
//
//        chain.doFilter(request, response);
//    }
//}
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");
        String username = null;

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Extract JWT token
            username = jwtUtils.extractUsername(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtils.validateToken(token, username)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username, null, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }
}
