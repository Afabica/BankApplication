//package com.example.demo.service;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.stereotype.Component;
//import io.jsonwebtoken.*;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//
//import java.util.*;
//
//@Component
//public class JwtTokenProvider {
//
//    private String jwtSecret = "your-secret-key";  // You can externalize this in application properties
//    private int jwtExpirationInMs = 3600000;  // 1 hour
//
//    // Generate JWT token
//    public String generateToken(Authentication authentication) {
//        User userPrincipal = (User) authentication.getPrincipal();
//        return Jwts.builder()
//                .setSubject(userPrincipal.getUsername())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMs))
//                .signWith(SignatureAlgorithm.HS512, jwtSecret)
//                .compact();
//    }
//
//    // Get authentication from JWT token
//    public Authentication getAuthentication(String token) {
//        User userDetails = new User(getUsernameFromJWT(token), "", new ArrayList<>());
//        return new UsernamePasswordAuthenticationToken(userDetails, "", new ArrayList<>());
//    }
//
//    // Validate the JWT token
//    public boolean validateToken(String authToken) {
//        try {
//            Jwts.parser()
//                    .setSigningKey(jwtSecret)
//                    .parseClaimsJws(authToken);
//            return true;
//        } catch (SignatureException ex) {
//            throw new RuntimeException("Invalid JWT signature");
//        } catch (MalformedJwtException ex) {
//            throw new RuntimeException("Invalid JWT token");
//        } catch (ExpiredJwtException ex) {
//            throw new RuntimeException("Expired JWT token");
//        } catch (UnsupportedJwtException ex) {
//            throw new RuntimeException("Unsupported JWT token");
//        } catch (IllegalArgumentException ex) {
//            throw new RuntimeException("JWT claims string is empty");
//        }
//    }
//
//    // Get username from JWT token
//    public String getUsernameFromJWT(String token) {
//        Claims claims = Jwts.parser()
//                .setSigningKey(jwtSecret)
//                .parseClaimsJws(token)
//                .getBody();
//        return claims.getSubject();
//    }
//}
//
