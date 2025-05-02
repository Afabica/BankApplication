//package com.example.demo.jwtsecurity;
//
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.http.HttpStatus;
//
//import jakarta.servlet.Filter;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.FilterConfig;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Date;
//import org.springframework.stereotype.Component;
//import java.util.ArrayList;
//
//@Component
//public class JwtAuthFilt extends OncePerRequestFilter {
//
//    private final String SECRET_KEY = "yourSecretKey";
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//
//        String token = request.getHeader("Authorization");
//
//        if (token != null && token.startsWith("Bearer ")) {
//            String jwtToken = token.substring(7);
//            String username = Jwts.parser()
//                    .setSigningKey(SECRET_KEY)
//                    .parseClaimsJws(jwtToken)
//                    .getBody()
//                    .getSubject();
//
//            if (username != null) {
//                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//        chain.doFilter(request, response);
//    }
//
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
//                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                .compact();
//    }
//}

