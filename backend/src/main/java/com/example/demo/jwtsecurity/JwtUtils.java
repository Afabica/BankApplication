package com.example.demo.jwtsecurity;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import com.example.demo.repository.RegisterRepo;
import com.example.demo.model.RegisterUser;
import javax.crypto.SecretKey;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;


import com.example.demo.model.LoginUser;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    private final RegisterRepo registerRepo;

    @Autowired
    public JwtUtils(RegisterRepo registerRepo) {
        this.registerRepo = registerRepo;
    }

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // Generate a JWT token for a given user
    public String generatingToken(LoginUser user) {
        RegisterUser regUser = registerRepo.findByUsername(user.getUsername());
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token expires in 24 hours
                .signWith(key)
                .compact();
    }

    // Extract claims from a token
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract username from a token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if a token is expired
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Validate a token by comparing the username and checking expiration
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    // Verify a token without extracting claims
    public boolean verifyToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}

