package com.example.demo.jwtsecurity;

import com.example.demo.model.RefreshToken;
import com.example.demo.model.RegisterUser;
import com.example.demo.repository.RegisterRepo;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;

@Component
public class JwtUtils {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtRefreshSecret}")
    private String jwtRefreshSecret;

    @Value("${app.jwtExpirationMs}")
    private long jwtExpirationMs;

    @Value("${app.jwtRefreshExpirationMs}")
    private long jwtRefreshExpirationMs;

    private SecretKey accessKey;
    private SecretKey refreshKey;

    private final RegisterRepo registerRepo;

    public JwtUtils(RegisterRepo registerRepo) {
        this.registerRepo = registerRepo;
    }

    @PostConstruct
    public void init() {
        // Create keys from your secret strings (must be properly sized)
        this.accessKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.refreshKey = Keys.hmacShaKeyFor(jwtRefreshSecret.getBytes());
    }

    // Generate access token
    public String generateAccessToken(String username, List<String> roles) {
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(accessKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Generate refresh token
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtRefreshExpirationMs))
                .signWith(refreshKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // You can optionally have a method to generate token from RegisterUser
    public String generateTokenFromUser(RegisterUser user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(accessKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Validate access token
    public boolean validateAccessToken(String token) {
        return validateToken(token, accessKey);
    }

    // Validate refresh token
    public boolean validateRefreshToken(String token) {
        return validateToken(token, refreshKey);
    }

    // Extract username from access token
    public String extractUsernameFromAccessToken(String token) {
        return extractUsername(token, accessKey);
    }

    // Extract username from refresh token
    public String extractUsernameFromRefreshToken(String token) {
        return extractUsername(token, refreshKey);
    }

    // Common token validation logic
    private boolean validateToken(String token, SecretKey key) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
            return false;
        }
    }

    // Common method to extract username (subject) from token
    private String extractUsername(String token, SecretKey key) {
        Claims claims =
                Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    // Optional: build Spring Security user from token
    public User getUserDetailsFromToken(String token, boolean isAccessToken) {
        String username =
                isAccessToken
                        ? extractUsernameFromAccessToken(token)
                        : extractUsernameFromRefreshToken(token);
        return new User(username, "", Collections.emptyList());
    }

    // Validate RefreshToken expiration
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Refresh token has expired. Please log in again.");
        }
        return token;
    }
}
